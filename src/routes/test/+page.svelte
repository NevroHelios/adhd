<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { pauses } from '#lib/engine/risk.ts';
	import { next } from '#lib/engine/route.ts';
	import type { Answer } from '#lib/engine/types.ts';
	import { answer, bank, s, undo } from '#lib/session.svelte.ts';
	import Pause from '#lib/ui/Pause.svelte';

	const scaleOf = new Map(bank.scales.flatMap((sc) => sc.items.map((it) => [it.id, sc])));

	const item = $derived(s.loaded ? next(bank, s.answers) : undefined);
	const scale = $derived(item && scaleOf.get(item.id));
	const paused = $derived(pauses(bank, s.answers) && s.paused !== s.answers.length);
	const visited = $derived(new Set(s.answers.map((a) => scaleOf.get(a.id)?.condition)));
	let undone = $state<Answer | undefined>();

	function pick(value: number) {
		if (!item) return;
		undone = undefined;
		answer({ id: item.id, value });
	}

	function back() {
		undone = s.answers.at(-1);
		undo();
	}

	function onkey(e: KeyboardEvent) {
		if (!item || paused || e.metaKey || e.ctrlKey || e.altKey) return;
		const n = Number(e.key);
		if (n >= 1 && n <= item.options.length) pick(n - 1);
		else if (e.key === 'Backspace' && s.answers.length) back();
	}

	$effect(() => {
		if (s.loaded && !item && !paused) goto(resolve('/results'), { replaceState: true });
	});
</script>

<svelte:head><title>Questions · Open Screen</title></svelte:head>
<svelte:window onkeydown={onkey} />

<div class="wrap">
	{#if !s.stored}
		<p class="muted small">This browser isn't allowing storage, so your answers won't survive a reload.</p>
	{/if}
	{#if paused}
		<Pause onContinue={() => (s.paused = s.answers.length)} />
	{:else if item && scale}
		<div class="bar">
			<button class="back" onclick={back} disabled={!s.answers.length} aria-label="Previous question">← Back</button>
			<ol class="domains" aria-label="Areas">
				{#each bank.conditions as c (c.id)}
					<li class:on={c.id === scale.condition} class:done={visited.has(c.id) && c.id !== scale.condition}>
						{c.name}
					</li>
				{/each}
			</ol>
			<span class="count">Q{s.answers.length + 1}</span>
		</div>

		{#key item.id}
			<section class="q" in:fly={{ y: 12, duration: 220 }}>
				<div class="meta">
					{#if scale.track === 'experimental'}<span class="chip x">Experimental question</span>{/if}
					<span class="muted">{scale.timeframe}</span>
				</div>
				{#if scale.stem}<p class="stem">{scale.stem}</p>{/if}
				<h1 class="text">{item.text}</h1>
				<div class="opts" role="group" aria-label="Answer">
					{#each item.options as o, i (i)}
						<button class="opt" class:prev={undone?.id === item.id && undone.value === i} onclick={() => pick(i)}>
							<kbd>{i + 1}</kbd><span>{o}</span>
						</button>
					{/each}
				</div>
			</section>
		{/key}

		<div class="now">
			<a class="btn quiet" href={resolve('/results')}>Give me results now</a>
			<small class="muted">You can come back and keep going later.</small>
		</div>
	{/if}
</div>

<style>
	.small { font-size: 0.85rem; }
	.bar { display: flex; align-items: center; gap: 0.75rem; margin: 0.5rem 0 1.5rem; }
	.back { background: none; border: none; color: var(--ink-2); font: 500 0.95rem var(--sans); padding: 0.5rem 0; cursor: pointer; min-height: 44px; }
	.back:disabled { opacity: 0.35; cursor: default; }
	.domains { flex: 1; display: flex; gap: 0.35rem; list-style: none; padding: 0; margin: 0; overflow-x: auto; justify-content: center; }
	.domains li { font-size: 0.75rem; white-space: nowrap; padding: 0.2em 0.65em; border-radius: 999px; color: var(--ink-3); border: 1px solid var(--line); }
	.domains li.on { color: var(--accent-ink); background: var(--accent); border-color: var(--accent); }
	.domains li.done { color: var(--accent); border-color: var(--accent); }
	.count { font-size: 0.85rem; color: var(--ink-3); font-variant-numeric: tabular-nums; }
	.meta { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; margin-bottom: 1rem; }
	.stem { color: var(--ink-2); margin-bottom: 0.4rem; }
	.text { font-size: clamp(1.45rem, 4.5vw, 1.9rem); margin-bottom: 1.5rem; }
	.opts { display: grid; gap: 0.6rem; }
	.opt {
		display: flex; align-items: center; gap: 0.9rem; width: 100%; min-height: 56px; padding: 0.8rem 1rem;
		background: var(--card); color: var(--ink); border: 1.5px solid var(--line); border-radius: var(--r);
		font: 500 1.05rem var(--sans); text-align: left; cursor: pointer; transition: border-color 0.12s, background 0.12s;
	}
	@media (hover: hover) { .opt:hover { border-color: var(--accent); } } /* touch keeps :hover after a tap; it would pre-mark the next question */
	.opt:active, .opt.prev { background: var(--accent-soft); border-color: var(--accent); }
	kbd {
		flex: none; display: grid; place-items: center; width: 1.8rem; height: 1.8rem; border-radius: 8px;
		background: var(--paper); border: 1px solid var(--line); font: 600 0.8rem var(--sans); color: var(--ink-3);
	}
	.now { display: flex; flex-direction: column; align-items: center; margin-top: 2rem; gap: 0.25rem; }
	@media (hover: none) { kbd { display: none; } }
</style>
