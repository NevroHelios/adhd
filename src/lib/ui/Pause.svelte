<script lang="ts">
	import Helplines from './Helplines.svelte';

	let { onContinue }: { onContinue: () => void } = $props();
</script>

<section class="card pause" aria-labelledby="pause-h">
	<h2 id="pause-h">Let's pause for a moment</h2>
	<p>
		You said you've often had thoughts of being better off dead or of hurting yourself. That sounds really
		hard, and you deserve support with it. Talking to someone today can help, and these lines are free and confidential.
	</p>
	<Helplines />
	<p class="note muted">
		If you might act on these thoughts, or you are not safe right now, call 112 or go to the nearest hospital emergency
		department.
	</p>
	<button class="btn ghost" onclick={onContinue}>Continue the questions</button>
</section>

<style>
	.pause { border-top: 4px solid var(--accent); }
	.note { margin-top: 1rem; }
</style>
