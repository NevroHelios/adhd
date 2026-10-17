import { describe, expect, it } from 'vitest';
import { blocks } from './report.ts';
import type { Card } from './view.ts';

const card = (over: Partial<Card> = {}): Card => ({
	id: 'd', name: 'Depression', blurb: '', started: true, track: 'validated', headline: 'Mild', level: 1,
	detail: '6 out of 27 points.', drivers: [{ text: 'Feeling tired', answer: 'Nearly every day' }],
	competing: [], remaining: 0, scale: 'PHQ-9', source: 'Kroenke 2001', ...over
});

describe('report blocks', () => {
	it('lists each started condition with band, detail and drivers', () => {
		const b = blocks([card(), card({ id: 'a', name: 'ADHD', started: false })], { date: '2026-10-18', finished: true, risk: 0 });
		const text = b.map((x) => x.t).join('\n');
		expect(text).toMatch(/Depression/);
		expect(text).toMatch(/Mild/);
		expect(text).toMatch(/Feeling tired: Nearly every day/);
		expect(text).not.toMatch(/ADHD/);
		expect(b.find((x) => x.k === 'band')!.level).toBe(1);
	});
	it('leads with helplines when a risk answer appeared', () => {
		const b = blocks([card()], { date: 'd', finished: true, risk: 1 });
		expect(b[1].t).toMatch(/14416/);
	});
	it('says when results are partial', () => {
		expect(blocks([card()], { date: 'd', finished: false, risk: 0 }).map((x) => x.t).join()).toMatch(/stopped early/i);
	});
	it('badges experimental results', () => {
		expect(blocks([card({ track: 'experimental', percentile: 'Around the 80th percentile' })], { date: 'd', finished: true, risk: 0 }).map((x) => x.t).join()).toMatch(/Experimental/);
	});
});
