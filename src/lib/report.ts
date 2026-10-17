// The downloadable report as a flat list of text blocks, drawn by both the PDF
// and the PNG renderers so the two never disagree.

import type { Card } from './view.ts';

export type Block = { k: 'title' | 'help' | 'h' | 'band' | 'p' | 'li' | 'note'; t: string; level?: number };
type Meta = { date: string; finished: boolean; risk: number };

export function blocks(cards: Card[], m: Meta): Block[] {
	const out: Block[] = [{ k: 'title', t: 'Open Screen results' }];
	if (m.risk > 0)
		out.push({ k: 'help', t: 'If you are having thoughts of hurting yourself: Tele-MANAS 14416 or 1-800-891-4416 (free, 24x7). In an emergency call 112.' });
	out.push({ k: 'note', t: `${m.date} · A screening result, not a diagnosis.${m.finished ? '' : ' The check was stopped early, so some results are ranges.'}` });
	for (const c of cards.filter((c) => c.started)) {
		out.push({ k: 'h', t: `${c.name} · ${c.track === 'experimental' ? 'Experimental' : 'Validated'} (${c.scale})` });
		out.push({ k: 'band', t: c.headline, level: c.level });
		out.push({ k: 'p', t: c.detail });
		if (c.percentile) out.push({ k: 'p', t: c.percentile });
		for (const d of c.drivers) out.push({ k: 'li', t: `${d.text}: ${d.answer}` });
		if (c.competing.length) out.push({ k: 'note', t: `Also elevated: ${c.competing.join(', ')}. These can produce similar experiences.` });
	}
	out.push({ k: 'note', t: 'Consider sharing this with a doctor, psychiatrist or psychologist. Made with Open Screen; answers were scored on this device.' });
	return out;
}
