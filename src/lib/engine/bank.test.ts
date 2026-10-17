import { describe, expect, it } from 'vitest';
import { validate } from './bank.ts';
import type { Bank } from './types.ts';

const ok = (): Bank => ({
	version: 't',
	conditions: [{ id: 'dep', name: 'Depression', blurb: '' }],
	scales: [
		{
			id: 'phq',
			condition: 'dep',
			name: 'PHQ',
			track: 'validated',
			source: 's',
			timeframe: 't',
			scoring: 'sum',
			screen: { items: 1, cutoff: 1 },
			bands: [
				{ min: 0, label: 'a', level: 0 },
				{ min: 2, label: 'b', level: 2 }
			],
			items: [
				{ id: 'p1', text: 'x', options: ['0', '1'] },
				{ id: 'p2', text: 'y', options: ['0', '1'], risk: { banner: 1, pause: 1 } }
			]
		},
		{
			id: 'own',
			condition: 'dep',
			name: 'Own',
			track: 'experimental',
			source: 's',
			timeframe: 't',
			scoring: 'irt',
			opens_if: { scale: 'phq', min: 1 },
			items: [{ id: 'o1', text: 'z', options: ['0', '1', '2'], irt: { a: 1, b: [-1, 1] } }]
		}
	]
});

describe('validate', () => {
	it('accepts a well-formed bank', () => {
		expect(validate(ok())).toEqual([]);
	});
	it.each([
		['duplicate item ids', (b: Bank) => (b.scales[1].items[0].id = 'p1'), /duplicate item id p1/],
		['unknown condition', (b: Bank) => (b.scales[0].condition = 'nope'), /unknown condition/],
		['weights length', (b: Bank) => (b.scales[0].items[0].weights = [0]), /weights/],
		['irt threshold count', (b: Bank) => (b.scales[1].items[0].irt = { a: 1, b: [0] }), /thresholds/],
		['irt order', (b: Bank) => (b.scales[1].items[0].irt = { a: 1, b: [1, -1] }), /ascending/],
		['irt a', (b: Bank) => (b.scales[1].items[0].irt = { a: 0, b: [-1, 1] }), /discrimination/],
		['irt scale item without params', (b: Bank) => delete b.scales[1].items[0].irt, /needs irt/],
		['count item without counts_from', (b: Bank) => (b.scales[0].scoring = 'count'), /counts_from/],
		['risk out of range', (b: Bank) => (b.scales[0].items[1].risk = { banner: 1, pause: 5 }), /risk/],
		['screen too long', (b: Bank) => (b.scales[0].screen = { items: 9, cutoff: 1 }), /screen/],
		['opens_if forward reference', (b: Bank) => b.scales.reverse(), /opens_if/],
		['bands not starting at 0', (b: Bank) => (b.scales[0].bands![0].min = 1), /bands/],
		['empty options', (b: Bank) => (b.scales[0].items[0].options = []), /options/]
	])('rejects %s', (_, mutate, msg) => {
		const b = ok();
		mutate(b);
		expect(validate(b).join('\n')).toMatch(msg);
	});
});
