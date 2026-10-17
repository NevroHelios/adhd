// Which question comes next. Pure function of the bank and the answers so far;
// the same routing serves both scoring modes.
// Pass 1 asks every screener; pass 2 asks follow-ups, safety items and
// experimental items, in bank order.

import { expectedVar, posterior, psd } from './irt.ts';
import { range, screen, settled } from './scale.ts';
import type { Answer, Bank, Item, Scale } from './types.ts';

export const PSD_STOP = 0.3;

export function isOpen(bank: Bank, scale: Scale, answers: Answer[]): boolean {
	if (!scale.opens_if) return true;
	const src = bank.scales.find((s) => s.id === scale.opens_if!.scale);
	if (!src) throw new Error(`${scale.id}: opens_if names unknown scale ${scale.opens_if.scale}`);
	return range(src, answers).min >= scale.opens_if.min;
}

export function scored(scale: Scale, answers: Answer[]) {
	const got = new Map(answers.map((a) => [a.id, a.value]));
	return scale.items.flatMap((it) => {
		const v = got.get(it.id);
		return v === undefined || !it.irt ? [] : [{ irt: it.irt, value: v }];
	});
}

function nextIrt(scale: Scale, answers: Answer[], asked: Set<string>): Item | undefined {
	const done = scale.items.filter((it) => asked.has(it.id)).length;
	if (done >= (scale.max_items ?? scale.items.length)) return;
	const w = posterior(scored(scale, answers));
	if (done > 0 && psd(w) < PSD_STOP) return;
	let best: Item | undefined;
	let bestV = Infinity;
	for (const it of scale.items) {
		if (asked.has(it.id) || !it.irt) continue;
		const v = expectedVar(w, it.irt);
		if (v < bestV) [best, bestV] = [it, v];
	}
	return best;
}

function nextFixed(scale: Scale, answers: Answer[], asked: Set<string>): Item | undefined {
	const fresh = (it: Item) => !asked.has(it.id);
	const st = screen(scale, answers);
	if (st === 'pending') return scale.items.slice(0, scale.screen!.items).find(fresh);
	const done = st === 'negative' || (scale.scoring !== 'none' && settled(scale, answers));
	return scale.items.find((it) => fresh(it) && (!done || it.always));
}

// A screener is an ungated validated scale; with an explicit screen only its first items count.
function nextIn(scale: Scale, answers: Answer[], asked: Set<string>, pass: 1 | 2): Item | undefined {
	if (scale.scoring === 'irt') return pass === 2 ? nextIrt(scale, answers, asked) : undefined;
	if (pass === 2) return nextFixed(scale, answers, asked);
	if (scale.screen) return screen(scale, answers) === 'pending' ? nextFixed(scale, answers, asked) : undefined;
	const screener = scale.track === 'validated' && !scale.opens_if && scale.scoring !== 'none';
	return screener ? nextFixed(scale, answers, asked) : undefined;
}

export function next(bank: Bank, answers: Answer[]): Item | undefined {
	const asked = new Set(answers.map((a) => a.id));
	for (const pass of [1, 2] as const)
		for (const scale of bank.scales) {
			if (!isOpen(bank, scale, answers)) continue;
			const it = nextIn(scale, answers, asked, pass);
			if (it) return it;
		}
}
