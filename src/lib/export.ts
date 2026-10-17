// Draw report blocks to a PNG (canvas) or a PDF (jsPDF, loaded only when asked for).

import type { Block } from './report.ts';

const LEVEL = ['#7fa38a', '#c7ab5f', '#d18c4a', '#b8613f', '#8e3b4a'];
const style: Record<Block['k'], { size: number; weight: number; color: string; gap: number; serif?: boolean }> = {
	title: { size: 30, weight: 600, color: '#1d2729', gap: 10, serif: true },
	help: { size: 16, weight: 700, color: '#1f5f66', gap: 12 },
	h: { size: 15, weight: 600, color: '#4a5759', gap: 4 },
	band: { size: 26, weight: 600, color: '#1d2729', gap: 6, serif: true },
	p: { size: 15, weight: 400, color: '#1d2729', gap: 6 },
	li: { size: 14, weight: 400, color: '#4a5759', gap: 3 },
	note: { size: 13, weight: 400, color: '#7b8789', gap: 12 }
};
// Extra space before section headings.
const before = (k: Block['k']) => (k === 'h' ? 22 : 0);

export async function png(bs: Block[]): Promise<Blob> {
	const W = 1080, PAD = 64, SCALE = 1.6, inner = W / SCALE - 2 * PAD / SCALE;
	const c = document.createElement('canvas');
	const g = c.getContext('2d')!;
	const font = (b: Block) => {
		const s = style[b.k];
		return `${s.weight} ${s.size}px ${s.serif ? 'Georgia, serif' : 'system-ui, sans-serif'}`;
	};
	const wrap = (b: Block) => {
		g.font = font(b);
		const prefix = b.k === 'li' ? '•  ' : '';
		const lines: string[] = [];
		let line = prefix;
		for (const w of b.t.split(' ')) {
			const tryLine = line === prefix ? line + w : `${line} ${w}`;
			if (g.measureText(tryLine).width > inner && line !== prefix) {
				lines.push(line);
				line = (prefix ? '   ' : '') + w;
			} else line = tryLine;
		}
		lines.push(line);
		return lines;
	};
	const layout = () => {
		let y = PAD / SCALE;
		const ops: { b: Block; lines: string[]; y: number }[] = [];
		for (const b of bs) {
			y += before(b.k);
			const lines = wrap(b);
			ops.push({ b, lines, y });
			y += lines.length * style[b.k].size * 1.35 + style[b.k].gap;
		}
		return { ops, h: y + PAD / SCALE };
	};
	const { h } = layout();
	c.width = W;
	c.height = Math.ceil(h * SCALE);
	g.scale(SCALE, SCALE);
	g.fillStyle = '#fffdf8';
	g.fillRect(0, 0, W, c.height);
	g.textBaseline = 'top';
	for (const { b, lines, y } of layout().ops) {
		const s = style[b.k];
		g.font = font(b);
		g.fillStyle = b.k === 'band' ? LEVEL[b.level ?? 0] : s.color;
		if (b.k === 'band') g.fillRect(PAD / SCALE - 14, y + 4, 5, s.size);
		g.fillStyle = s.color;
		lines.forEach((l, i) => g.fillText(l, PAD / SCALE, y + i * s.size * 1.35));
	}
	return new Promise((ok, fail) => c.toBlob((b) => (b ? ok(b) : fail(new Error('canvas export failed'))), 'image/png'));
}

export async function pdf(bs: Block[]): Promise<Blob> {
	const { jsPDF } = await import('jspdf');
	const d = new jsPDF({ unit: 'pt', format: 'a4' });
	const M = 56, W = d.internal.pageSize.getWidth() - 2 * M, H = d.internal.pageSize.getHeight();
	let y = M;
	for (const b of bs) {
		const s = style[b.k];
		y += before(b.k);
		d.setFont(s.serif ? 'times' : 'helvetica', s.weight >= 600 ? 'bold' : 'normal');
		d.setFontSize(s.size * 0.8);
		const lines: string[] = d.splitTextToSize((b.k === 'li' ? '•  ' : '') + b.t, W);
		const lh = s.size * 0.8 * 1.35;
		if (y + lines.length * lh > H - M) {
			d.addPage();
			y = M;
		}
		if (b.k === 'band') {
			d.setFillColor(LEVEL[b.level ?? 0]);
			d.rect(M - 12, y + 2, 4, s.size * 0.8, 'F');
		}
		d.setTextColor(s.color);
		d.text(lines, M, y, { baseline: 'top' });
		y += lines.length * lh + s.gap * 0.8;
	}
	return d.output('blob');
}
