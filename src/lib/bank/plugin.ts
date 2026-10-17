// Vite plugin: `import bank from 'virtual:bank'` gives the compiled, validated bank.
// An invalid bank fails the build and shows the errors in dev.

import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { Plugin } from 'vite';
import { compile } from './compile.ts';

const ID = 'virtual:bank';
const RESOLVED = '\0' + ID;

export function bankPlugin(dir = 'bank'): Plugin {
	const root = resolve(dir);
	return {
		name: 'open-screen-bank',
		resolveId: (id) => (id === ID ? RESOLVED : undefined),
		load(id) {
			if (id !== RESOLVED) return;
			const names = readdirSync(root).filter((f) => f.endsWith('.yaml'));
			const files = names.map((name) => {
				const path = join(root, name);
				this.addWatchFile(path);
				return { name, text: readFileSync(path, 'utf8') };
			});
			return `export default ${JSON.stringify(compile(files))};`;
		},
		handleHotUpdate({ file, server }) {
			if (!file.startsWith(root)) return;
			const mod = server.moduleGraph.getModuleById(RESOLVED);
			if (mod) server.moduleGraph.invalidateModule(mod);
			server.ws.send({ type: 'full-reload' });
			return [];
		}
	};
}
