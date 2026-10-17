import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { compile } from './bank/compile.ts';
import { cards, ordinal } from './view.ts';
import type { Answer } from './engine/types.ts';

const bank = compile(readdirSync('bank').map((f) => ({ name: f, text: readFileSync(`bank/${f}`, 'utf8') })));
const all = (v: number, ids: string[]): Answer[] => ids.map((id) => ({ id, value: v }));
const phq = ['phq.1', 'phq.2', 'phq.3', 'phq.4', 'phq.5', 'phq.6', 'phq.7', 'phq.8', 'phq.9'];
const card = (answers: Answer[], id: string, mode: 'validated' | 'experimental' = 'validated') =>
	cards(bank, answers, mode).find((c) => c.id === id)!;

describe('cards', () => {
	it('shows a complete validated result with score out of max', () => {
		const c = card([{ id: 'phq.1', value: 2 }, ...all(1, phq.slice(1))], 'depression');
		expect(c).toMatchObject({ track: 'validated', headline: 'Moderate', level: 2, remaining: 0 });
		expect(c.detail).toMatch(/10 out of 27/);
	});
	it('shows a band range when stopped early', () => {
		const c = card(all(2, ['phq.1', 'phq.2']), 'depression');
		expect(c.headline).toBe('Minimal to Severe');
		expect(c.remaining).toBe(7);
	});
	it('marks conditions with no answers', () => {
		expect(card([], 'adhd')).toMatchObject({ started: false });
	});
	it('uses the experimental scale in experimental mode, labelled provisional', () => {
		const ans = all(3, ['adhdx.drift', 'adhdx.delay', 'adhdx.forget']);
		const c = card(ans, 'adhd', 'experimental');
		expect(c.track).toBe('experimental');
		expect(c.percentile).toMatch(/percentile/);
		expect(card(ans, 'adhd', 'validated').track).toBe('validated');
	});
	it('falls back to validated in experimental mode when a condition has no experimental scale', () => {
		expect(card(all(1, phq), 'depression', 'experimental').track).toBe('validated');
	});
});

describe('ordinal', () => {
	it.each([[1, '1st'], [2, '2nd'], [3, '3rd'], [11, '11th'], [12, '12th'], [13, '13th'], [22, '22nd'], [99, '99th']])('%i -> %s', (n, s) => {
		expect(ordinal(n)).toBe(s);
	});
});
