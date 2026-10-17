// Results as display-ready text, shared by the results page and the PDF/PNG export.

import { provisional, results, type ScaleResult } from './engine/results.ts';
import { range } from './engine/scale.ts';
import type { Answer, Bank, Mode, Track } from './engine/types.ts';

export type Card = {
	id: string;
	name: string;
	blurb: string;
	started: boolean;
	track: Track;
	headline: string;
	level: number; // 0..4, drives colour
	detail: string;
	percentile?: string;
	drivers: { text: string; answer: string }[];
	competing: string[];
	remaining: number;
	scale: string;
	source: string;
};

export function ordinal(n: number): string {
	const t = n % 100;
	const suf = t >= 11 && t <= 13 ? 'th' : (['th', 'st', 'nd', 'rd'][n % 10] ?? 'th');
	return `${n}${suf}`;
}

function detail(m: ScaleResult): string {
	const max = range(m.scale, []).max;
	const unit = m.scale.scoring === 'count' ? 'key symptoms' : 'points';
	const of = `${m.score} out of ${max} ${unit}`;
	switch (m.status) {
		case 'not-started':
			return 'No questions answered yet.';
		case 'screen-negative':
			return `The first ${m.scale.screen!.items} questions scored below the screening threshold, so the rest were skipped.`;
		case 'settled':
			return `${of} so far. The remaining questions could not change this result, so they were skipped.`;
		case 'complete':
			return `${of}.`;
		case 'partial':
			return `${of} from ${m.answered} of ${m.answered + m.remaining} questions. The range covers every result still possible.`;
	}
}

const pctText = (p: { mid: number; lo: number; hi: number }) =>
	`Around the ${ordinal(Math.round(p.mid * 100))} percentile (likely between the ${ordinal(Math.max(1, Math.round(p.lo * 100)))} and ${ordinal(Math.min(99, Math.round(p.hi * 100)))}).`;

export function cards(bank: Bank, answers: Answer[], mode: Mode): Card[] {
	return results(bank, answers).flatMap((r): Card[] => {
		const base = { id: r.condition.id, name: r.condition.name, blurb: r.condition.blurb, competing: r.competing.map((c) => c.name) };
		const xs = bank.scales.find((s) => s.condition === r.condition.id && s.scoring === 'irt');
		if (mode === 'experimental' && r.experimental && xs) {
			const b = provisional(r.experimental.pct.mid);
			return [{
				...base,
				started: true,
				track: 'experimental',
				headline: b.label,
				level: b.level,
				detail: `Based on ${r.experimental.n} of our own questions. Cut points are provisional and not yet calibrated against real data.`,
				percentile: pctText(r.experimental.pct),
				drivers: [],
				remaining: 0,
				scale: xs.name,
				source: xs.source
			}];
		}
		const m = r.main;
		if (!m) return [];
		const same = m.lo.min === m.hi.min;
		return [{
			...base,
			started: m.status !== 'not-started',
			track: 'validated',
			headline: same ? m.lo.label : `${m.lo.label} to ${m.hi.label}`,
			level: m.hi.level,
			detail: detail(m),
			drivers: m.drivers,
			remaining: m.remaining,
			scale: m.scale.name,
			source: m.scale.source
		}];
	});
}
