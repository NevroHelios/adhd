// Safety tiers from risk-flagged items: 0 none, 1 persistent banner, 2 pause screen.

import type { Answer, Bank, Item } from './types.ts';

function riskItems(bank: Bank): Map<string, Item> {
	return new Map(bank.scales.flatMap((s) => s.items.filter((it) => it.risk).map((it) => [it.id, it])));
}

function level(it: Item | undefined, value: number): 0 | 1 | 2 {
	if (!it?.risk) return 0;
	if (value >= it.risk.pause) return 2;
	return value >= it.risk.banner ? 1 : 0;
}

export function tier(bank: Bank, answers: Answer[]): 0 | 1 | 2 {
	const items = riskItems(bank);
	return answers.reduce<0 | 1 | 2>((t, a) => Math.max(t, level(items.get(a.id), a.value)) as 0 | 1 | 2, 0);
}

// Show the pause screen only right after the answer that triggered it.
export function pauses(bank: Bank, answers: Answer[]): boolean {
	const last = answers.at(-1);
	return !!last && level(riskItems(bank).get(last.id), last.value) === 2;
}
