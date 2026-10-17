<script lang="ts">
	import { resolve } from '$app/paths';
	import { blocks } from '#lib/report.ts';
	import { tier } from '#lib/engine/risk.ts';
	import { next } from '#lib/engine/route.ts';
	import type { Mode } from '#lib/engine/types.ts';
	import { bank, download, exportFile, replace, reset, s, setMode } from '#lib/session.svelte.ts';
	import { restore } from '#lib/store.ts';
	import Helplines from '#lib/ui/Helplines.svelte';
	import ResultCard from '#lib/ui/ResultCard.svelte';
	import { cards } from '#lib/view.ts';

	const finished = $derived(s.loaded && !next(bank, s.answers));
	const risk = $derived(tier(bank, s.answers));
	const cs = $derived(cards(bank, s.answers, s.mode));
	const hasX = $derived(bank.scales.some((sc) => sc.scoring === 'irt' && s.answers.some((a) => sc.items.some((it) => it.id === a.id))));
	let busy = $state('');
	let error = $state('');
	let confirmDel = $state(false);

	const today = () => new Date().toLocaleDateString('en-CA'); // local YYYY-MM-DD
	const report = () => {
		const xs = cards(bank, s.answers, 'experimental').filter((c) => c.track === 'experimental');
		return blocks([...cards(bank, s.answers, 'validated'), ...xs], { date: today(), finished, risk });
	};

	async function save(kind: 'pdf' | 'png') {
		busy = kind;
		error = '';
		try {
			const ex = await import('#lib/export.ts');
			download(`open-screen-${today()}.${kind}`, await ex[kind](report()));
		} catch (e) {
			error = `Couldn't create the ${kind.toUpperCase()}: ${(e as Error).message}`;
		} finally {
			busy = '';
		}
	}

	async function load(e: Event) {
		const f = (e.target as HTMLInputElement).files?.[0];
		if (!f) return;
		const r = restore(await f.text(), bank);
		if (r.kind !== 'ok') error = "That file doesn't look like an Open Screen answers file.";
		else {
			error = r.dropped ? `${r.dropped} answers no longer match the current questions and were left out.` : '';
			replace(r.state.answers, r.state.mode);
		}
	}

	const modes: [Mode, string][] = [['validated', 'Validated'], ['experimental', 'Experimental']];
</script>

<svelte:head><title>Results · Open Screen</title></svelte:head>

<div class="wrap">
	{#if s.loaded}
		{#if risk > 0}
			<section class="card support">
				<h2>Support first</h2>
				<p>Some of your answers mention thoughts of death or self-harm. Before anything else, you can talk to someone today.</p>
				<Helplines />
			</section>
		{/if}

		{#if !s.answers.length}
			<h1>No answers yet</h1>
			<p class="muted">Answer a few questions and your results will show up here.</p>
			<a class="btn" href={resolve('/test')}>Start the check</a>
		{:else}
			<h1>{finished ? 'Your results' : 'Your results so far'}</h1>
			<p class="muted">
				A screening result, not a diagnosis.
				{#if !finished}You stopped early, so some results are shown as ranges. More answers narrow them.{/if}
				{#if s.dropped}{s.dropped} saved answers no longer matched the current questions and were left out.{/if}
			</p>

			{#if !finished}<a class="btn keep" href={resolve('/test')}>Keep going</a>{/if}

			{#if hasX}
				<div class="mode" role="radiogroup" aria-label="Scoring">
					{#each modes as [m, label] (m)}
						<button role="radio" aria-checked={s.mode === m} class:on={s.mode === m} onclick={() => setMode(m)}>{label}</button>
					{/each}
				</div>
				<p class="mode-note muted">
					{#if s.mode === 'validated'}
						Scored the way the published questionnaires are scored.
					{:else}
						Adds our own adaptive questions, scored with a model whose numbers are still provisional. Treat these as a
						rough second opinion, not a replacement.
					{/if}
				</p>
			{/if}

			<div class="cards">
				{#each cs as c (c.id)}<ResultCard {c} />{/each}
			</div>

			<section class="next">
				<h2>What now</h2>
				<p>
					If a result is elevated, or if things are hard for you whatever the result says, consider talking to a doctor,
					psychiatrist or clinical psychologist. Bring the PDF; it lists what you answered most strongly.
				</p>
				<div class="actions">
					<button class="btn" onclick={() => save('pdf')} disabled={!!busy}>{busy === 'pdf' ? 'Preparing…' : 'Download PDF'}</button>
					<button class="btn ghost" onclick={() => save('png')} disabled={!!busy}>{busy === 'png' ? 'Preparing…' : 'Download image'}</button>
				</div>
				{#if error}<p class="err" role="alert">{error}</p>{/if}
			</section>

			<section class="data">
				<h3>Your answers</h3>
				<p class="muted">Saved only in this browser{s.stored ? '' : " (this browser is refusing storage, so they won't survive a reload)"}.</p>
				<div class="actions">
					<button class="btn quiet" onclick={() => download(`open-screen-answers-${today()}.json`, exportFile())}>Save answers to a file</button>
					<label class="btn quiet">Load answers from a file<input class="sr" type="file" accept=".json,application/json" onchange={load} /></label>
					<button class="btn quiet" onclick={() => (confirmDel ? (reset(), (confirmDel = false)) : (confirmDel = true))}>
						{confirmDel ? 'Tap again to delete everything' : 'Delete my answers'}
					</button>
				</div>
			</section>
		{/if}
	{/if}
</div>

<style>
	.support { border-top: 4px solid var(--accent); margin-bottom: 2rem; }
	.keep { margin: 0.5rem 0 1.5rem; }
	.mode { display: inline-flex; background: var(--card); border: 1px solid var(--line); border-radius: 999px; padding: 4px; margin-top: 0.5rem; }
	.mode button { border: none; background: none; padding: 0.55em 1.2em; border-radius: 999px; font: 600 0.95rem var(--sans); color: var(--ink-2); cursor: pointer; min-height: 40px; }
	.mode button.on { background: var(--accent); color: var(--accent-ink); }
	.mode-note { font-size: 0.9rem; margin-top: 0.5rem; }
	.cards { display: grid; gap: 1rem; margin: 1.5rem 0 2.5rem; }
	.actions { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }
	.next, .data { margin-bottom: 2rem; }
	.err { color: var(--warm); margin-top: 0.75rem; }
	label.btn { position: relative; }
</style>
