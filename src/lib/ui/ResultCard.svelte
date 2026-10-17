<script lang="ts">
	import type { Card } from '#lib/view.ts';

	let { c }: { c: Card } = $props();
</script>

<article class="card result" style:--lvl="var(--l{c.level})">
	<header>
		<h2>{c.name}</h2>
		<span class="chip" class:x={c.track === 'experimental'}>{c.track === 'experimental' ? 'Experimental' : 'Validated'}</span>
	</header>
	{#if c.started}
		<p class="band">{c.headline}</p>
		<p class="detail">{c.detail}</p>
		{#if c.percentile}<p class="detail">{c.percentile}</p>{/if}
		{#if c.drivers.length}
			<h3>What pushed this up</h3>
			<ul class="drivers">
				{#each c.drivers as d (d.text)}<li><span>{d.text}</span> <b>{d.answer}</b></li>{/each}
			</ul>
		{/if}
		{#if c.competing.length}
			<p class="competing">
				<b>Also worth considering:</b> {c.competing.join(', ')} also came out elevated. Their symptoms overlap, so a
				professional would look at them together.
			</p>
		{/if}
		<details>
			<summary>About this questionnaire</summary>
			<p><b>{c.scale}.</b> {c.source}</p>
		</details>
	{:else}
		<p class="muted">Not asked yet.</p>
	{/if}
</article>

<style>
	.result { border-left: 6px solid var(--lvl); }
	header { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }
	h2 { font-size: 1.05rem; font-family: var(--sans); color: var(--ink-2); margin: 0; }
	.band { font: 600 clamp(1.6rem, 5vw, 2rem)/1.15 var(--serif); margin: 0.4rem 0 0.6rem; }
	.detail { color: var(--ink-2); margin-bottom: 0.6rem; }
	h3 { font: 600 0.85rem var(--sans); text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-3); margin-top: 1rem; }
	.drivers { list-style: none; padding: 0; margin: 0 0 0.75rem; display: grid; gap: 0.4rem; }
	.drivers li { display: flex; justify-content: space-between; gap: 1rem; font-size: 0.95rem; border-bottom: 1px dashed var(--line); padding-bottom: 0.35rem; }
	.drivers b { font-weight: 600; white-space: nowrap; color: var(--ink); }
	.competing { background: var(--paper); border-radius: 10px; padding: 0.75rem 0.9rem; font-size: 0.95rem; }
	details { font-size: 0.85rem; color: var(--ink-2); }
	summary { cursor: pointer; color: var(--accent); }
	details p { margin-top: 0.5rem; }
	@media (max-width: 480px) { .drivers li { flex-direction: column; gap: 0; } .drivers b { white-space: normal; } }
</style>
