// The one piece of mutable app state: the answer log, the scoring mode, and
// what came back from browser storage. Everything else is derived from it.

import bank from 'virtual:bank';
import type { Answer, Mode } from './engine/types.ts';
import { KEY, restore, serialize } from './store.ts';

export { bank };

export const s = $state({
	answers: [] as Answer[],
	mode: 'validated' as Mode,
	loaded: false,
	corrupt: undefined as string | undefined, // raw text we could not read, kept so it can be downloaded
	dropped: 0, // answers discarded because the question bank changed
	paused: -1, // answers.length at which the pause screen was acknowledged
	stored: true // false when the browser refuses storage; the UI says progress won't survive a reload
});

function save() {
	try {
		localStorage.setItem(KEY, serialize({ bank: bank.version, mode: s.mode, answers: s.answers }));
		s.stored = true;
	} catch {
		s.stored = false;
	}
}

export function load() {
	if (s.loaded) return;
	let raw: string | null = null;
	try {
		raw = localStorage.getItem(KEY);
	} catch {
		s.stored = false;
	}
	const r = restore(raw, bank);
	if (r.kind === 'corrupt') s.corrupt = r.raw;
	if (r.kind === 'ok') {
		s.answers = r.state.answers;
		s.mode = r.state.mode;
		s.dropped = r.dropped;
	}
	s.loaded = true;
}

export function answer(a: Answer) {
	s.answers.push(a);
	save();
}

export function undo() {
	s.answers.pop();
	save();
}

export function setMode(m: Mode) {
	s.mode = m;
	save();
}

export function reset() {
	s.answers = [];
	s.corrupt = undefined;
	s.dropped = 0;
	s.paused = -1;
	save();
}

export function replace(answers: Answer[], mode: Mode) {
	s.answers = answers;
	s.mode = mode;
	s.corrupt = undefined;
	save();
}

export function download(name: string, blob: Blob) {
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = name;
	a.click();
	setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export const exportFile = () =>
	new Blob([serialize({ bank: bank.version, mode: s.mode, answers: s.answers })], { type: 'application/json' });
