// Published (validated-track) scoring: sums, counts, bands, screens, and the
// curtailment rule "stop once the remaining items can't change the result".

import type { Answer, Band, Item, Scale } from './types.ts';

export function itemScore(scale: Scale, item: Item, value: number): number {
	if (scale.scoring === 'count') return value >= (item.counts_from ?? Infinity) ? 1 : 0;
	return item.weights ? item.weights[value] : value;
}

function itemMax(scale: Scale, item: Item): number {
	if (scale.scoring === 'count') return 1;
	return item.weights ? Math.max(...item.weights) : item.options.length - 1;
}

function lookup(answers: Answer[]): Map<string, number> {
	return new Map(answers.map((a) => [a.id, a.value]));
}

function scoreRange(scale: Scale, items: Item[], answers: Answer[]) {
	const got = lookup(answers);
	let score = 0;
	let open = 0;
	let answered = 0;
	for (const it of items) {
		const v = got.get(it.id);
		if (v === undefined) open += itemMax(scale, it);
		else {
			score += itemScore(scale, it, v);
			answered++;
		}
	}
	return { score, min: score, max: score + open, answered, total: items.length };
}

export function range(scale: Scale, answers: Answer[]) {
	return scoreRange(scale, scale.items, answers);
}

export function bands(scale: Scale): Band[] {
	if (scale.bands) return scale.bands;
	if (scale.cutoff === undefined) return [];
	return [
		{ min: 0, label: 'Below screening threshold', level: 0 },
		{ min: scale.cutoff, label: 'Above screening threshold', level: 3 }
	];
}

export function bandOf(scale: Scale, score: number): Band | undefined {
	return bands(scale).findLast((b) => score >= b.min);
}

export type ScreenState = 'pending' | 'positive' | 'negative';

export function screen(scale: Scale, answers: Answer[]): ScreenState {
	if (!scale.screen) return 'positive';
	const r = scoreRange(scale, scale.items.slice(0, scale.screen.items), answers);
	if (r.min >= scale.screen.cutoff) return 'positive';
	if (r.max < scale.screen.cutoff) return 'negative';
	return 'pending';
}

// True when no answers to the remaining items could move the score into another band.
export function settled(scale: Scale, answers: Answer[]): boolean {
	const r = range(scale, answers);
	return bandOf(scale, r.min)?.min === bandOf(scale, r.max)?.min;
}
