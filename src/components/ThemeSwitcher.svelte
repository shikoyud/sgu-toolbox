<script lang="ts">
	import LightModeIcon from "./icons/LightMode.svelte";
	import DarkModeIcon from "./icons/DarkMode.svelte";
	import { app } from "$lib/app.svelte";
</script>

<label class="swap swap-rotate">
	<input type="checkbox" onclick={app.toggleTheme} checked={app.isDark}/>
	<LightModeIcon/>
	<DarkModeIcon/>
</label>

