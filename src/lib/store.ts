// Browser save format. Pure so it can be tested without a browser.

import type { Answer, Bank, Mode } from './engine/types.ts';

export type Saved = { bank: string; mode: Mode; answers: Answer[] };
export type Restored = { kind: 'fresh' } | { kind: 'corrupt'; raw: string } | { kind: 'ok'; state: Saved; dropped: number };

export const KEY = 'open-screen';

export const serialize = (s: Saved) => JSON.stringify({ v: 1, ...s });

const isAnswer = (a: unknown): a is Answer =>
	typeof a === 'object' && a !== null && typeof (a as Answer).id === 'string' && Number.isInteger((a as Answer).value);

function parse(raw: string): Saved | undefined {
	try {
		const d = JSON.parse(raw);
		if (d?.v !== 1 || typeof d.bank !== 'string' || !['validated', 'experimental'].includes(d.mode)) return;
		if (!Array.isArray(d.answers) || !d.answers.every(isAnswer)) return;
		return { bank: d.bank, mode: d.mode, answers: d.answers.map(({ id, value }: Answer) => ({ id, value })) };
	} catch {
		return;
	}
}

// After a bank update, keep only answers that still make sense: known item,
// option in range, first answer per item.
export function restore(raw: string | null, bank: Bank): Restored {
	if (raw === null) return { kind: 'fresh' };
	const s = parse(raw);
	if (!s) return { kind: 'corrupt', raw };
	const k = new Map(bank.scales.flatMap((sc) => sc.items.map((it) => [it.id, it.options.length])));
	const seen = new Set<string>();
	const answers = s.answers.filter((a) => {
		const ok = !seen.has(a.id) && a.value >= 0 && a.value < (k.get(a.id) ?? 0);
		seen.add(a.id);
		return ok;
	});
	return { kind: 'ok', dropped: s.answers.length - answers.length, state: { ...s, bank: bank.version, answers } };
}
