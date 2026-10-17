import { describe, expect, it } from 'vitest';
import { provisional, results } from './results.ts';
import { tier, pauses } from './risk.ts';
import type { Answer, Bank, Scale } from './types.ts';

const o4 = ['0', '1', '2', '3'];
const phq: Scale = {
	id: 'phq',
	condition: 'dep',
	name: 'PHQ',
	track: 'validated',
	source: 't',
	timeframe: 't',
	scoring: 'sum',
	screen: { items: 2, cutoff: 3 },
	bands: [
		{ min: 0, label: 'low', level: 0 },
		{ min: 5, label: 'mid', level: 2 },
		{ min: 9, label: 'high', level: 4 }
	],
	items: [
		{ id: 'p1', text: 'one', options: o4 },
		{ id: 'p2', text: 'two', options: o4 },
		{ id: 'p3', text: 'three', options: o4 },
		{ id: 'p4', text: 'four', options: o4, always: true, risk: { banner: 1, pause: 3 } }
	]
};
const own: Scale = {
	id: 'own',
	condition: 'adhd',
	name: 'Own',
	track: 'experimental',
	source: 't',
	timeframe: 't',
	scoring: 'irt',
	items: [{ id: 'x1', text: 'x', options: o4, irt: { a: 1.5, b: [-0.5, 0, 0.5] } }]
};
const asrs: Scale = {
	id: 'asrs',
	condition: 'adhd',
	name: 'ASRS',
	track: 'validated',
	source: 't',
	timeframe: 't',
	scoring: 'count',
	cutoff: 1,
	items: [{ id: 'a1', text: 'a', options: o4, counts_from: 2 }]
};
const bank: Bank = {
	version: 't',
	conditions: [
		{ id: 'adhd', name: 'ADHD', blurb: '' },
		{ id: 'dep', name: 'Depression', blurb: '' }
	],
	scales: [phq, asrs, own]
};
const a = (pairs: [string, number][]): Answer[] => pairs.map(([id, value]) => ({ id, value }));
const get = (answers: Answer[], id: string) => results(bank, answers).find((r) => r.condition.id === id)!;

describe('results: validated', () => {
	it('reports a complete scale with its band and drivers', () => {
		const r = get(a([['p1', 3], ['p2', 2], ['p3', 3], ['p4', 1]]), 'dep').main!;
		expect(r).toMatchObject({ status: 'complete', score: 9, lo: { label: 'high' }, hi: { label: 'high' } });
		expect(r.drivers.map((d) => d.text)).toEqual(['one', 'three', 'two']);
	});
	it('reports a negative screen using the screen items only', () => {
		const r = get(a([['p1', 1], ['p2', 0], ['p4', 0]]), 'dep').main!;
		expect(r).toMatchObject({ status: 'screen-negative', score: 1 });
	});
	it('gives a band range when stopped early', () => {
		const r = get(a([['p1', 3], ['p2', 1]]), 'dep').main!;
		expect(r.status).toBe('partial');
		expect(r.lo.label).toBe('low');
		expect(r.hi.label).toBe('high');
		expect(r.remaining).toBe(2);
	});
	it('marks scales with a settled band', () => {
		const r = get(a([['p1', 3], ['p2', 3], ['p3', 3], ['p4', 0]]), 'dep').main!;
		expect(r.status).toBe('complete');
		const s = get(a([['p1', 3], ['p2', 3], ['p3', 3]]), 'dep').main!;
		expect(s.status).toBe('settled');
	});
	it('has no main result before any answer', () => {
		expect(get([], 'dep').main!.status).toBe('not-started');
	});
});

describe('results: experimental and competing explanations', () => {
	it('adds a provisional percentile only when irt items were answered', () => {
		expect(get([], 'adhd').experimental).toBeUndefined();
		const x = get(a([['x1', 3]]), 'adhd').experimental!;
		expect(x.pct.mid).toBeGreaterThan(0.5);
		expect(x.n).toBe(1);
	});
	it('lists elevated other conditions as competing explanations for ADHD', () => {
		const r = get(a([['p1', 3], ['p2', 3], ['p3', 0], ['p4', 0], ['a1', 3]]), 'adhd');
		expect(r.competing.map((c) => c.id)).toEqual(['dep']);
		expect(get(a([['p1', 0], ['p2', 0], ['a1', 3]]), 'adhd').competing).toEqual([]);
	});
});

describe('risk', () => {
	it('is 0 without risk answers, 1 at banner, 2 at pause', () => {
		expect(tier(bank, a([['p1', 3]]))).toBe(0);
		expect(tier(bank, a([['p4', 1]]))).toBe(1);
		expect(tier(bank, a([['p4', 3]]))).toBe(2);
	});
	it('pauses only right after the triggering answer', () => {
		expect(pauses(bank, a([['p4', 3]]))).toBe(true);
		expect(pauses(bank, a([['p4', 3], ['p1', 0]]))).toBe(false);
	});
});

describe('provisional band', () => {
	it('cuts the experimental percentile at provisional points', () => {
		expect([0.5, 0.8, 0.95].map((p) => provisional(p).label)).toEqual(['Typical range', 'Elevated', 'High']);
	});
});
