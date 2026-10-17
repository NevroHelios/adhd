import { describe, expect, it } from 'vitest';
import { next, isOpen } from './route.ts';
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
	cutoff: 10,
	bands: [
		{ min: 0, label: 'low', level: 0 },
		{ min: 6, label: 'high', level: 3 }
	],
	items: [
		{ id: 'p1', text: '', options: o4 },
		{ id: 'p2', text: '', options: o4 },
		{ id: 'p3', text: '', options: o4 },
		{ id: 'p4', text: '', options: o4, always: true }
	]
};
const asrs: Scale = {
	id: 'asrs',
	condition: 'adhd',
	name: 'ASRS',
	track: 'validated',
	source: 't',
	timeframe: 't',
	scoring: 'count',
	cutoff: 2,
	items: ['a1', 'a2', 'a3'].map((id) => ({ id, text: '', options: o4, counts_from: 2 }))
};
const partB: Scale = {
	id: 'partb',
	condition: 'adhd',
	name: 'Part B',
	track: 'validated',
	source: 't',
	timeframe: 't',
	scoring: 'none',
	opens_if: { scale: 'asrs', min: 1 },
	items: [{ id: 'b1', text: '', options: o4 }]
};
const own: Scale = {
	id: 'own',
	condition: 'adhd',
	name: 'Own',
	track: 'experimental',
	source: 't',
	timeframe: 't',
	scoring: 'irt',
	max_items: 2,
	items: [
		{ id: 'x-far', text: '', options: o4, irt: { a: 1.5, b: [2.5, 3, 3.5] } },
		{ id: 'x-near', text: '', options: o4, irt: { a: 1.5, b: [-0.5, 0, 0.5] } },
		{ id: 'x-mid', text: '', options: o4, irt: { a: 1.5, b: [0.5, 1, 1.5] } }
	]
};
const bank: Bank = { version: 't', conditions: [], scales: [phq, asrs, partB, own] };
const a = (pairs: [string, number][]): Answer[] => pairs.map(([id, value]) => ({ id, value }));
const ids = (answers: Answer[]) => next(bank, answers)?.id;

describe('next', () => {
	it('asks every screen before any follow-up', () => {
		expect(ids([])).toBe('p1');
		expect(ids(a([['p1', 0]]))).toBe('p2');
		expect(ids(a([['p1', 0], ['p2', 0]]))).toBe('a1');
	});
	it('skips follow-ups of a negative screen but keeps always-items', () => {
		const s = a([['p1', 0], ['p2', 1], ['a1', 0], ['a2', 0], ['a3', 0]]);
		expect(ids(s)).toBe('p4');
	});
	it('continues a positive screen in order', () => {
		const s = a([['p1', 3], ['p2', 0], ['a1', 0], ['a2', 0], ['a3', 0]]);
		expect(ids(s)).toBe('p3');
	});
	it('stops a scale once its band is settled, except always-items', () => {
		// p1 + p2 = 6 reaches the top band, so p3 is skipped
		const s = a([['p1', 3], ['p2', 3], ['a1', 0], ['a2', 0], ['a3', 0]]);
		expect(ids(s)).toBe('p4');
	});
	it('opens gated scales only when their source passes', () => {
		const closed = a([['p1', 0], ['p2', 0], ['p4', 0], ['a1', 0], ['a2', 0], ['a3', 0]]);
		expect(isOpen(bank, partB, closed)).toBe(false);
		const opened = a([['p1', 0], ['p2', 0], ['p4', 0], ['a1', 3], ['a2', 0], ['a3', 0]]);
		expect(isOpen(bank, partB, opened)).toBe(true);
		expect(ids(opened)).toBe('b1');
	});
	it('picks the most informative experimental item, up to max_items', () => {
		const done = a([['p1', 0], ['p2', 0], ['p4', 0], ['a1', 0], ['a2', 0], ['a3', 0]]);
		expect(ids(done)).toBe('x-near');
		const two = [...done, ...a([['x-near', 1], ['x-mid', 0]])];
		expect(ids(two)).toBeUndefined();
	});
});
