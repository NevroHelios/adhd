<script lang="ts">
	import Helplines from '#lib/ui/Helplines.svelte';
</script>

<svelte:head><title>Get help now · Open Screen</title></svelte:head>

<div class="wrap">
	<h1>Talk to someone now</h1>
	<p class="lede">
		If you're struggling, you don't have to wait for a result or a diagnosis. These services are free and confidential.
	</p>
	<div class="card"><Helplines /></div>
	<h2>If you are in danger right now</h2>
	<p>Call 112, or go to the emergency department of the nearest hospital. If you can, stay with someone you trust.</p>
	<h2>Worried about someone else?</h2>
	<p>
		Ask them directly whether they are thinking about suicide. Asking does not put the idea in their head. Listen, stay
		with them if they are at risk, and help them call one of the numbers above.
	</p>
</div>

<style>
	.lede { font-size: 1.1rem; color: var(--ink-2); }
	.card { margin: 1.5rem 0 2rem; }
	h2 { margin-top: 1.5rem; }
</style>
