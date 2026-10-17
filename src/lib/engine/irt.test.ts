import { describe, expect, it } from 'vitest';
import { GRID, eap, expectedVar, percentile, posterior, probs, psd } from './irt.ts';

describe('probs (graded response model)', () => {
	it('matches the 2PL closed form for two categories', () => {
		expect(probs({ a: 1, b: [0] }, 0)[1]).toBeCloseTo(0.5, 12);
		expect(probs({ a: 1, b: [0] }, 1)[1]).toBeCloseTo(0.7310585786300049, 12);
	});
	it('matches hand-computed GRM values for three categories', () => {
		// P*1 = 1/(1+e^-1.5), P*2 = 1/(1+e^1.5)
		const p = probs({ a: 1.5, b: [-1, 1] }, 0);
		expect(p[0]).toBeCloseTo(0.18242552380635635, 12);
		expect(p[1]).toBeCloseTo(0.6351489523872873, 12);
		expect(p[2]).toBeCloseTo(0.18242552380635635, 12);
	});
	it('sums to 1 and stays positive across the grid', () => {
		for (const t of [-4, -1.3, 0, 2.2, 4]) {
			const p = probs({ a: 2.1, b: [-1.5, -0.2, 0.4, 1.8] }, t);
			expect(p.reduce((s, x) => s + x, 0)).toBeCloseTo(1, 12);
			expect(Math.min(...p)).toBeGreaterThan(0);
		}
	});
});

describe('posterior', () => {
	const item = { a: 1.8, b: [-1, 0, 1] };

	it('is the standard normal prior with no answers', () => {
		const w = posterior([]);
		expect(eap(w)).toBeCloseTo(0, 10);
		expect(psd(w)).toBeCloseTo(1, 2); // grid truncated at +-4
		expect(percentile(w).mid).toBeCloseTo(0.5, 10);
	});
	it('moves symmetrically for symmetric items', () => {
		const hi = eap(posterior([{ irt: item, value: 3 }]));
		const lo = eap(posterior([{ irt: item, value: 0 }]));
		expect(hi).toBeGreaterThan(0.5);
		expect(lo).toBeCloseTo(-hi, 10);
	});
	it('shrinks the spread as answers accumulate', () => {
		const one = psd(posterior([{ irt: item, value: 2 }]));
		const three = psd(posterior([1, 2, 3].map(() => ({ irt: item, value: 2 }))));
		expect(three).toBeLessThan(one);
		expect(one).toBeLessThan(1);
	});
	it('agrees with a fine independent integration', () => {
		const ans = [
			{ irt: item, value: 3 },
			{ irt: { a: 1.2, b: [0.5] }, value: 0 }
		];
		// Independent midpoint integration over [-6, 6], step 0.001.
		let z = 0;
		let m = 0;
		for (let t = -6; t < 6; t += 0.001) {
			const x = t + 0.0005;
			let l = Math.exp(-x * x / 2);
			for (const a of ans) l *= probs(a.irt, x)[a.value];
			z += l;
			m += l * x;
		}
		expect(eap(posterior(ans))).toBeCloseTo(m / z, 3);
	});
	it('has a fine enough grid', () => {
		expect(GRID.length).toBeGreaterThanOrEqual(161);
	});
});

describe('expectedVar', () => {
	it('never exceeds the current variance (law of total variance)', () => {
		const w = posterior([]);
		const v = expectedVar(w, { a: 1.5, b: [-0.5, 0.5] });
		expect(v).toBeLessThan(psd(w) ** 2);
	});
	it('prefers items targeted at the current estimate', () => {
		const w = posterior([]);
		const near = expectedVar(w, { a: 1.5, b: [0] });
		const far = expectedVar(w, { a: 1.5, b: [3.5] });
		expect(near).toBeLessThan(far);
	});
});

describe('percentile', () => {
	it('gives an interval containing the midpoint', () => {
		const p = percentile(posterior([{ irt: { a: 2, b: [-1, 0, 1] }, value: 3 }]));
		expect(p.lo).toBeLessThan(p.mid);
		expect(p.hi).toBeGreaterThan(p.mid);
		expect(p.mid).toBeGreaterThan(0.5);
	});
});
