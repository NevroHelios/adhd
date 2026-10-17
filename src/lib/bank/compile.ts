// Turns the bank/*.yaml files into one validated Bank. Runs at build time only.

import { createHash } from 'node:crypto';
import { parse } from 'yaml';
import { validate } from '../engine/bank.ts';
import type { Bank, Condition, Scale } from '../engine/types.ts';

type File = { name: string; text: string };

export function compile(files: File[]): Bank {
	const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
	const conditions: Condition[] = [];
	const scales: Scale[] = [];
	for (const f of sorted) {
		const doc = parse(f.text);
		if (!doc?.condition?.id) throw new Error(`${f.name}: missing condition`);
		conditions.push(doc.condition);
		for (const s of doc.scales ?? []) scales.push({ ...s, condition: doc.condition.id });
	}
	const hash = createHash('sha256');
	for (const f of sorted) hash.update(f.name).update('\0').update(f.text).update('\0');
	const bank: Bank = { version: hash.digest('hex').slice(0, 8), conditions, scales };
	const errs = validate(bank);
	if (errs.length) throw new Error(`bank invalid:\n${errs.join('\n')}`);
	return bank;
}
