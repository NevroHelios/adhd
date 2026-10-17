<script lang="ts">
	import { resolve } from '$app/paths';
	import { tel } from '#lib/help.ts';
</script>

<aside class="banner" role="note">
	<div class="wrap">
		If you're having thoughts of hurting yourself, you can talk to someone now:
		<a href={tel('14416')}>Tele-MANAS 14416</a> (free, 24x7). <a href={resolve('/help')}>More help</a>
	</div>
</aside>

<style>
	.banner { position: sticky; top: 0; z-index: 5; background: var(--accent); color: var(--accent-ink); font-size: 0.92rem; padding: 0.6rem 0; }
	a { color: inherit; font-weight: 700; }
</style>
