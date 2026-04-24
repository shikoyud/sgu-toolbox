<script lang="ts">
	import { app } from "$lib/app.svelte";
	import ToolboxIcon from "./icons/Toolbox.svelte";

</script>

<a href="/" class="flex items-center bg-base" onclick={() => app.drawerOpen = false}>
	<ToolboxIcon/>
	<h1 class="font-manrope text-xl text-primary-content"><span class="font-manrope font-bold text-2xl">SGU</span> Toolbox </h1>
</a>

