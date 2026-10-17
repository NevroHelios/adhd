import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { compile } from './compile.ts';

const file = (name: string, text: string) => ({ name, text });
const dep = `
condition: { id: dep, name: Depression, blurb: b }
scales:
  - id: phq
    name: PHQ
    track: validated
    source: s
    timeframe: t
    scoring: sum
    items:
      - { id: p1, text: x, options: [a, b] }
`;

describe('compile', () => {
	it('stamps each scale with its file condition and keeps file order', () => {
		const b = compile([file('20-b.yaml', dep.replaceAll('dep', 'dep2').replaceAll('phq', 'phq2').replace('p1', 'q1')), file('10-a.yaml', dep)]);
		expect(b.conditions.map((c) => c.id)).toEqual(['dep', 'dep2']);
		expect(b.scales.map((s) => [s.id, s.condition])).toEqual([['phq', 'dep'], ['phq2', 'dep2']]);
		expect(b.version).toMatch(/^[0-9a-f]{8}$/);
	});
	it('throws with every validation error and the file name', () => {
		expect(() => compile([file('10-a.yaml', dep.replace('options: [a, b]', 'options: [a]'))])).toThrow(/at least 2 options/);
		expect(() => compile([file('10-a.yaml', 'scales: []')])).toThrow(/10-a.yaml.*condition/);
	});
	it('changes version when content changes', () => {
		expect(compile([file('a.yaml', dep)]).version).not.toBe(compile([file('a.yaml', dep + '\n# x')]).version);
	});
	it('accepts the real bank', () => {
		const dir = 'bank';
		const files = readdirSync(dir).filter((f) => f.endsWith('.yaml')).map((f) => file(f, readFileSync(`${dir}/${f}`, 'utf8')));
		const b = compile(files);
		expect(b.scales.find((s) => s.id === 'phq9')!.items).toHaveLength(9);
		expect(b.scales.find((s) => s.id === 'asrs6')!.items).toHaveLength(6);
		expect(b.scales.find((s) => s.id === 'asrsb')!.items).toHaveLength(12);
	});
});
