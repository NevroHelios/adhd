import { describe, expect, it } from 'vitest';
import { bandOf, range, screen, settled } from './scale.ts';
import type { Answer, Scale } from './types.ts';

const opts4 = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];
const phq: Scale = {
	id: 'phq',
	condition: 'depression',
	name: 'PHQ-9',
	track: 'validated',
	source: 'test',
	timeframe: '2 weeks',
	scoring: 'sum',
	screen: { items: 2, cutoff: 3 },
	cutoff: 10,
	bands: [
		{ min: 0, label: 'Minimal', level: 0 },
		{ min: 5, label: 'Mild', level: 1 },
		{ min: 10, label: 'Moderate', level: 2 },
		{ min: 15, label: 'Moderately severe', level: 3 },
		{ min: 20, label: 'Severe', level: 4 }
	],
	items: Array.from({ length: 9 }, (_, i) => ({ id: `p${i + 1}`, text: `q${i + 1}`, options: opts4 }))
};

const asrs: Scale = {
	id: 'asrs',
	condition: 'adhd',
	name: 'ASRS-6',
	track: 'validated',
	source: 'test',
	timeframe: '6 months',
	scoring: 'count',
	cutoff: 4,
	items: [2, 2, 2, 3, 3, 3].map((c, i) => ({
		id: `a${i + 1}`,
		text: `a${i + 1}`,
		options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
		counts_from: c
	}))
};

const ans = (pairs: [string, number][]): Answer[] => pairs.map(([id, value]) => ({ id, value }));

describe('range', () => {
	it('is [0, max] with no answers', () => {
		expect(range(phq, [])).toEqual({ score: 0, min: 0, max: 27, answered: 0, total: 9 });
	});
	it('narrows as items are answered', () => {
		expect(range(phq, ans([['p1', 3], ['p2', 1]]))).toMatchObject({ min: 4, max: 25, answered: 2 });
	});
	it('uses count scoring thresholds per item', () => {
		// a1 Sometimes counts (from 2); a4 Sometimes does not (from 3)
		expect(range(asrs, ans([['a1', 2], ['a4', 2]]))).toMatchObject({ score: 1, max: 5 });
	});
	it('uses explicit option weights', () => {
		const w: Scale = { ...asrs, scoring: 'sum', items: [{ id: 'w', text: 'w', options: ['a', 'b', 'c'], weights: [0, 1, 5] }] };
		expect(range(w, ans([['w', 2]]))).toMatchObject({ score: 5, max: 5 });
		expect(range(w, [])).toMatchObject({ max: 5 });
	});
	it('ignores answers to other scales', () => {
		expect(range(phq, ans([['a1', 4]])).answered).toBe(0);
	});
});

describe('bandOf', () => {
	it('picks the highest band whose min is reached', () => {
		expect(bandOf(phq, 0)?.label).toBe('Minimal');
		expect(bandOf(phq, 9)?.label).toBe('Mild');
		expect(bandOf(phq, 10)?.label).toBe('Moderate');
		expect(bandOf(phq, 27)?.label).toBe('Severe');
	});
	it('falls back to cutoff bands when none are given', () => {
		expect(bandOf(asrs, 3)?.level).toBe(0);
		expect(bandOf(asrs, 4)?.level).toBe(3);
	});
});

describe('screen', () => {
	it('is pending until the screen items decide', () => {
		expect(screen(phq, ans([['p1', 1]]))).toBe('pending');
	});
	it('is positive at the cutoff', () => {
		expect(screen(phq, ans([['p1', 2], ['p2', 1]]))).toBe('positive');
	});
	it('is negative below the cutoff', () => {
		expect(screen(phq, ans([['p1', 1], ['p2', 1]]))).toBe('negative');
	});
	it('decides early once the result cannot change (curtailment)', () => {
		expect(screen(phq, ans([['p1', 3]]))).toBe('positive');
	});
	it('is positive for scales without a screen', () => {
		expect(screen(asrs, [])).toBe('positive');
	});
});

describe('settled', () => {
	it('is false while the band can still move', () => {
		expect(settled(phq, ans([['p1', 3], ['p2', 3]]))).toBe(false);
	});
	it('is true once min and max fall in the same band', () => {
		// 8 answered items at 3 = 24, max 27: both Severe
		const a = ans(phq.items.slice(0, 8).map((it) => [it.id, 3]));
		expect(settled(phq, a)).toBe(true);
	});
	it('settles count scales once the cutoff decision is fixed', () => {
		expect(settled(asrs, ans([['a1', 4], ['a2', 4], ['a3', 4], ['a4', 4]]))).toBe(true);
		expect(settled(asrs, ans([['a1', 0], ['a2', 0], ['a3', 0]]))).toBe(true);
		expect(settled(asrs, ans([['a1', 4], ['a2', 0]]))).toBe(false);
	});
});
