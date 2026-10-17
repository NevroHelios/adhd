<script lang="ts">
	import { resolve } from '$app/paths';
	import { bank, download, reset, s } from '#lib/session.svelte.ts';

	const started = $derived(s.loaded && s.answers.length > 0);
	const names = bank.conditions.map((c) => c.name);
</script>

<svelte:head><title>Open Screen · free, private ADHD and mood self-check</title></svelte:head>

<section class="wrap hero">
	<p class="eyebrow">Free · private · open source</p>
	<h1>Is it ADHD, low mood, or something else?</h1>
	<p class="lede">
		A self-check built from questionnaires that clinicians use. It adapts as you go, skips what it doesn't need, and
		shows how sure it is. Stop whenever you like and see results so far.
	</p>
	<div class="cta">
		{#if started}
			<a class="btn" href={resolve('/test')}>Continue where you left off</a>
			<a class="btn ghost" href={resolve('/results')}>See results so far</a>
			<button class="btn quiet" onclick={reset}>Start over</button>
		{:else}
			<a class="btn" href={resolve('/test')}>Start the check</a>
			<span class="muted">About 5 to 15 minutes</span>
		{/if}
	</div>
	{#if s.corrupt}
		<p class="card warn">
			We found a saved session but couldn't read it. Starting the check will replace it.
			<button class="btn quiet" onclick={() => download('open-screen-unreadable.txt', new Blob([s.corrupt!]))}>
				Download the unreadable data
			</button>
		</p>
	{/if}
</section>

<section class="wrap grid">
	<div class="card">
		<h3>What it covers</h3>
		<p>{names.join(', ')}. More areas (anxiety, trauma, autism traits, mood swings, OCD) are being added.</p>
	</div>
	<div class="card">
		<h3>What it is not</h3>
		<p>Not a diagnosis. Many things look like ADHD, including low mood, poor sleep and stress. A result here is a reason to talk to a professional, not a replacement for one.</p>
	</div>
	<div class="card">
		<h3>Your answers stay here</h3>
		<p>No account, no tracking. Answers are saved only in this browser so you can come back. You can download or delete them any time.</p>
	</div>
</section>

<style>
	.hero { padding-top: 2.5rem; padding-bottom: 2rem; }
	.eyebrow { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--warm); }
	.lede { font-size: 1.15rem; color: var(--ink-2); max-width: 36rem; }
	.cta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1rem; margin-top: 1.75rem; }
	.grid { display: grid; gap: 1rem; padding-bottom: 1rem; }
	.grid p { margin: 0; color: var(--ink-2); }
	.warn { margin-top: 1.5rem; border-left: 4px solid var(--warm); }
	@media (min-width: 720px) { .grid { grid-template-columns: repeat(3, 1fr); max-width: 64rem; } }
</style>
