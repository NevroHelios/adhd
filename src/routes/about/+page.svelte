<script lang="ts">
	import { bank } from '#lib/session.svelte.ts';

	const condName = new Map(bank.conditions.map((c) => [c.id, c.name]));
</script>

<svelte:head><title>About · Open Screen</title></svelte:head>

<div class="wrap">
	<h1>How this works</h1>
	<p>
		Open Screen asks short questionnaires one question at a time. It starts with brief screening questions for each area
		and only goes deeper where your answers suggest it's worth it. It stops asking once more answers can't change a
		result. You can stop any time and see what it can say so far, with ranges where it's still unsure.
	</p>
	<h2>Validated and experimental</h2>
	<p>
		<b>Validated</b> results use published questionnaires, worded and scored exactly as published, with their published
		cut-offs. <b>Experimental</b> results come from questions we wrote ourselves, scored with an item response model.
		Their numbers are provisional guesses until we can calibrate them, so they are always labelled.
	</p>
	<h2>Privacy</h2>
	<p>
		Everything runs in your browser. There is no server-side storage, no account, and no analytics. Answers are kept in
		this browser's local storage so you can come back; you can delete them from the results page.
	</p>
	<h2>Questionnaires used</h2>
	<ul class="scales">
		{#each bank.scales as sc (sc.id)}
			<li>
				<b>{sc.name}</b>
				<span class="chip" class:x={sc.track === 'experimental'}>{condName.get(sc.condition)} · {sc.track}</span>
				<p class="muted">{sc.source}</p>
			</li>
		{/each}
	</ul>
	<p class="muted">Question bank version {bank.version}.</p>
</div>

<style>
	h2 { margin-top: 2rem; }
	.scales { list-style: none; padding: 0; display: grid; gap: 1rem; }
	.scales p { font-size: 0.9rem; margin: 0.3rem 0 0; }
	.chip { margin-left: 0.4rem; }
</style>
