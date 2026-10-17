import { describe, expect, it } from 'vitest';
import { restore, serialize, type Saved } from './store.ts';
import type { Bank } from './engine/types.ts';

const bank: Bank = {
	version: 'v2',
	conditions: [{ id: 'd', name: 'D', blurb: '' }],
	scales: [
		{
			id: 's', condition: 'd', name: 'S', track: 'validated', source: '', timeframe: '', scoring: 'sum',
			items: [
				{ id: 'a', text: 'a', options: ['0', '1', '2'] },
				{ id: 'b', text: 'b', options: ['0', '1'] }
			]
		}
	]
};
const saved = (over: Partial<Saved> = {}): string =>
	serialize({ bank: 'v2', mode: 'validated', answers: [{ id: 'a', value: 2 }], ...over });

describe('restore', () => {
	it('starts fresh when nothing is stored', () => {
		expect(restore(null, bank)).toEqual({ kind: 'fresh' });
	});
	it('round-trips a saved session', () => {
		expect(restore(saved({ mode: 'experimental' }), bank)).toEqual({
			kind: 'ok',
			dropped: 0,
			state: { bank: 'v2', mode: 'experimental', answers: [{ id: 'a', value: 2 }] }
		});
	});
	it.each([['not json', '{oops'], ['wrong shape', '{"v":1,"answers":"x"}'], ['unknown format', '{"v":9}'], ['bad mode', saved({ mode: 'x' as never })]])(
		'flags %s as corrupt and keeps the raw text',
		(_, raw) => {
			expect(restore(raw, bank)).toEqual({ kind: 'corrupt', raw });
		}
	);
	it('drops answers the current bank cannot accept after a bank update', () => {
		const raw = saved({ bank: 'v1', answers: [{ id: 'a', value: 1 }, { id: 'gone', value: 0 }, { id: 'b', value: 5 }, { id: 'a', value: 0 }] });
		expect(restore(raw, bank)).toEqual({
			kind: 'ok',
			dropped: 3,
			state: { bank: 'v2', mode: 'validated', answers: [{ id: 'a', value: 1 }] }
		});
	});
});
