<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import { asset, resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { tier } from '#lib/engine/risk.ts';
	import { bank, load, s } from '#lib/session.svelte.ts';
	import Banner from '#lib/ui/Banner.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	onMount(load);
	const risk = $derived(tier(bank, s.answers));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="manifest" href={asset('manifest.webmanifest')} />
	<link rel="apple-touch-icon" href={asset('apple-touch-icon.png')} />
	<meta name="theme-color" content="#1f5f66" />
	<meta name="description" content="A free, private self-check for ADHD and depression. Answers stay on your device." />
</svelte:head>

{#if risk > 0}<Banner />{/if}

<header class="wrap top">
	<a class="mark" href={resolve('/')}>Open Screen</a>
	<nav>
		<a href={resolve('/about')}>About</a>
		<a class="help" href={resolve('/help')}>Get help now</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer class="wrap foot">
	<p>
		This is a screening tool, not a diagnosis. Your answers never leave this device.
		<a href={resolve('/help')}>Need to talk to someone?</a>
	</p>
</footer>

<style>
	.top { display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; padding-bottom: 1rem; }
	.mark { font: 600 1.15rem var(--serif); color: var(--ink); text-decoration: none; }
	nav { display: flex; gap: 1.1rem; font-size: 0.95rem; }
	nav a { color: var(--ink-2); text-decoration: none; }
	nav .help { color: var(--accent); font-weight: 600; }
	main { min-height: 70vh; }
	.foot { padding-top: 3rem; padding-bottom: 2rem; font-size: 0.85rem; color: var(--ink-3); }
</style>
