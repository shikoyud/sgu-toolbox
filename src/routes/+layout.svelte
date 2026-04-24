<script lang="ts">
	import "../app.css";
	import favicon from '$lib/assets/favicon.png';
	import { afterNavigate, goto } from "$app/navigation";
	import { onMount } from "svelte";
	import NavBar from "$components/NavBar.svelte";
	import SideBar from "$components/SideBar.svelte";
	import { user } from "$lib/user.svelte";
	import { app } from "$lib/app.svelte";

	let { children } = $props()

	function guard() {
		if ((!user.isLoggedIn || user.expires_at < Date.now()) && location.pathname !== "/login" && location.pathname !== "/") {
			user.logout()
			goto("/login")
		}
	}

	onMount(() => {
		app.refresh()
		user.refresh()
		guard()
	})

	afterNavigate(guard)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<NavBar/>
<SideBar>{@render children()}</SideBar>
