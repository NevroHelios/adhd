<script lang="ts">
	import { ELSEWHERE, INDIA, tel } from '#lib/help.ts';
</script>

<ul class="lines">
	{#each INDIA as l (l.name)}
		<li>
			<div class="name">{l.name} <span class="muted">· {l.hours}</span></div>
			<div class="nums">
				{#each l.numbers as n (n)}<a class="num" href={tel(n)}>{n}</a>{/each}
			</div>
			<small>{l.about}{#if !l.checked}{' '}Number not yet re-checked on the official site.{/if}</small>
		</li>
	{/each}
	<li>
		<div class="name">Outside India</div>
		<small><a href={ELSEWHERE.url} rel="noopener">{ELSEWHERE.name}</a>: {ELSEWHERE.about}</small>
	</li>
</ul>

<style>
	.lines { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; }
	.name { font-weight: 600; }
	.nums { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.3rem 0; }
	.num {
		font: 600 1.15rem var(--sans); padding: 0.35em 0.9em; border-radius: 999px;
		background: var(--accent); color: var(--accent-ink); text-decoration: none;
	}
</style>
