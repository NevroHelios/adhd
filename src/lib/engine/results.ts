// Per-condition results from whatever answers exist so far. Works on any prefix
// of a session, which is what "Give me results now" relies on.

import { eap, percentile, posterior, psd } from './irt.ts';
import { scored } from './route.ts';
import { bandOf, itemScore, range, screen, settled } from './scale.ts';
import type { Answer, Band, Bank, Condition, Scale } from './types.ts';

export type Status = 'not-started' | 'partial' | 'screen-negative' | 'settled' | 'complete';

export type ScaleResult = {
	scale: Scale;
	status: Status;
	score: number; // points from answered items
	lo: Band; // band of the lowest reachable score
	hi: Band; // band of the highest reachable score
	answered: number;
	remaining: number; // unanswered items that could still change the result
	drivers: { text: string; answer: string }[];
};

export type ConditionResult = {
	condition: Condition;
	main?: ScaleResult;
	experimental?: { eap: number; psd: number; pct: { mid: number; lo: number; hi: number }; n: number };
	competing: Condition[];
};

const NONE: Band = { min: 0, label: 'No score', level: 0 };

function scaleResult(scale: Scale, answers: Answer[]): ScaleResult {
	const got = new Map(answers.map((a) => [a.id, a.value]));
	const st = screen(scale, answers);
	const pool = st === 'negative' ? scale.items.slice(0, scale.screen!.items) : scale.items;
	const r = range({ ...scale, items: pool }, answers);
	const status: Status =
		r.answered === 0 ? 'not-started'
		: st === 'negative' ? 'screen-negative'
		: r.answered === r.total ? 'complete'
		: settled(scale, answers) ? 'settled'
		: 'partial';
	const drivers = scale.items
		.flatMap((it) => {
			const v = got.get(it.id);
			if (v === undefined || it.risk) return [];
			const s = itemScore(scale, it, v);
			return s > 0 ? [{ s, text: it.text, answer: it.options[v] }] : [];
		})
		.sort((x, y) => y.s - x.s)
		.slice(0, 3)
		.map(({ text, answer }) => ({ text, answer }));
	return {
		scale,
		status,
		score: r.score,
		lo: bandOf(scale, r.min) ?? NONE,
		hi: bandOf(scale, st === 'negative' ? r.score : r.max) ?? NONE,
		answered: r.answered,
		remaining: status === 'partial' ? r.total - r.answered : 0,
		drivers
	};
}

function experimental(scales: Scale[], answers: Answer[]) {
	const s = scales.flatMap((sc) => scored(sc, answers));
	if (s.length === 0) return;
	const w = posterior(s);
	return { eap: eap(w), psd: psd(w), pct: percentile(w), n: s.length };
}

export function results(bank: Bank, answers: Answer[]): ConditionResult[] {
	const mains = new Map(
		bank.conditions.map((c) => {
			const sc = bank.scales.find((s) => s.condition === c.id && s.track === 'validated' && s.scoring !== 'none');
			return [c.id, sc && scaleResult(sc, answers)];
		})
	);
	return bank.conditions.map((c) => ({
		condition: c,
		main: mains.get(c.id),
		experimental: experimental(bank.scales.filter((s) => s.condition === c.id), answers),
		competing: bank.conditions.filter((o) => o.id !== c.id && (mains.get(o.id)?.lo.level ?? 0) >= 2)
	}));
}

// Experimental headline. Cut points are placeholders until there is calibration data.
const PROVISIONAL: Band[] = [
	{ min: 0, label: 'Typical range', level: 0 },
	{ min: 0.75, label: 'Elevated', level: 2 },
	{ min: 0.93, label: 'High', level: 3 }
];
export const provisional = (pct: number): Band => PROVISIONAL.findLast((b) => pct >= b.min)!;
