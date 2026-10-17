// Experimental-track scoring: graded response model, posterior on a theta grid
// (Bock & Mislevy 1982 EAP), and minimum expected posterior variance selection.
// Prior is N(0, 1), i.e. theta is in general-population SD units by assumption.

import type { Irt } from './types.ts';

export const GRID: number[] = Array.from({ length: 161 }, (_, i) => -4 + i * 0.05);

const logistic = (x: number) => 1 / (1 + Math.exp(-x));

export function probs(irt: Irt, theta: number): number[] {
	// Cumulative P(X >= k) for k = 1..K-1, padded with 1 and 0.
	const cum = [1, ...irt.b.map((b) => logistic(irt.a * (theta - b))), 0];
	return cum.slice(0, -1).map((c, k) => c - cum[k + 1]);
}

export type Scored = { irt: Irt; value: number };

// Normalized posterior weights over GRID.
export function posterior(answers: Scored[]): number[] {
	const logw = GRID.map((t) => {
		let l = -t * t / 2;
		for (const a of answers) l += Math.log(probs(a.irt, t)[a.value]);
		return l;
	});
	const top = Math.max(...logw);
	const w = logw.map((l) => Math.exp(l - top));
	const z = w.reduce((s, x) => s + x, 0);
	return w.map((x) => x / z);
}

export const eap = (w: number[]) => w.reduce((s, x, g) => s + x * GRID[g], 0);

export function psd(w: number[]): number {
	const m = eap(w);
	return Math.sqrt(w.reduce((s, x, g) => s + x * (GRID[g] - m) ** 2, 0));
}

// Expected posterior variance after asking an item, averaged over its predicted answers.
export function expectedVar(w: number[], irt: Irt): number {
	const pg = GRID.map((t) => probs(irt, t));
	let total = 0;
	for (let k = 0; k <= irt.b.length; k++) {
		const joint = w.map((x, g) => x * pg[g][k]);
		const pk = joint.reduce((s, x) => s + x, 0);
		if (pk <= 0) continue;
		total += pk * psd(joint.map((x) => x / pk)) ** 2;
	}
	return total;
}

// Normal CDF via Abramowitz & Stegun 7.1.26 (abs error < 1.5e-7); odd-symmetric by construction.
export function phi(x: number): number {
	const z = Math.abs(x) / Math.SQRT2;
	const t = 1 / (1 + 0.3275911 * z);
	const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
	const erf = 1 - poly * Math.exp(-z * z);
	return x >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
}

function quantile(w: number[], q: number): number {
	let c = 0;
	for (let g = 0; g < w.length; g++) {
		c += w[g];
		if (c >= q) return GRID[g];
	}
	return GRID[GRID.length - 1];
}

// Population percentile (0..1) with a 95% credible interval.
export function percentile(w: number[]) {
	return {
		mid: w.reduce((s, x, g) => s + x * phi(GRID[g]), 0),
		lo: phi(quantile(w, 0.025)),
		hi: phi(quantile(w, 0.975))
	};
}
