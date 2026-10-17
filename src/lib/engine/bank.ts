// Structural checks for the compiled bank. The build refuses to run if any fail.

import type { Bank } from './types.ts';

export function validate(bank: Bank): string[] {
	const errs: string[] = [];
	const conditions = new Set(bank.conditions.map((c) => c.id));
	const seenItems = new Set<string>();
	const seenScales = new Set<string>();

	for (const s of bank.scales) {
		const at = `scale ${s.id}`;
		if (seenScales.has(s.id)) errs.push(`${at}: duplicate scale id`);
		if (!conditions.has(s.condition)) errs.push(`${at}: unknown condition ${s.condition}`);
		if (s.opens_if && !seenScales.has(s.opens_if.scale))
			errs.push(`${at}: opens_if must name an earlier scale, got ${s.opens_if.scale}`);
		seenScales.add(s.id);
		if (s.items.length === 0) errs.push(`${at}: no items`);
		if (s.screen && (s.screen.items < 1 || s.screen.items > s.items.length))
			errs.push(`${at}: screen covers ${s.screen.items} of ${s.items.length} items`);
		if (s.bands) {
			if (s.bands[0]?.min !== 0) errs.push(`${at}: bands must start at min 0`);
			for (let i = 1; i < s.bands.length; i++)
				if (s.bands[i].min <= s.bands[i - 1].min) errs.push(`${at}: bands must ascend`);
		}

		for (const it of s.items) {
			const ai = `${at} item ${it.id}`;
			const k = it.options.length;
			if (seenItems.has(it.id)) errs.push(`${ai}: duplicate item id ${it.id}`);
			seenItems.add(it.id);
			if (k < 2) errs.push(`${ai}: needs at least 2 options`);
			if (!it.text) errs.push(`${ai}: empty text`);
			if (it.weights && it.weights.length !== k) errs.push(`${ai}: weights length ${it.weights.length} != ${k} options`);
			if (s.scoring === 'count' && (it.counts_from === undefined || it.counts_from < 0 || it.counts_from >= k))
				errs.push(`${ai}: count scoring needs counts_from in 0..${k - 1}`);
			if (it.risk && !(0 < it.risk.banner && it.risk.banner <= it.risk.pause && it.risk.pause < k))
				errs.push(`${ai}: risk thresholds must satisfy 0 < banner <= pause < ${k}`);
			if (s.scoring === 'irt' && !it.irt) errs.push(`${ai}: irt scale item needs irt params`);
			if (it.irt) {
				if (!(it.irt.a > 0)) errs.push(`${ai}: discrimination a must be > 0`);
				if (it.irt.b.length !== k - 1) errs.push(`${ai}: needs ${k - 1} thresholds, got ${it.irt.b.length}`);
				if (it.irt.b.some((b, i) => i > 0 && b <= it.irt!.b[i - 1])) errs.push(`${ai}: thresholds must be ascending`);
			}
		}
	}
	return errs;
}
