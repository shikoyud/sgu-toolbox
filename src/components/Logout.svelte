<script lang="ts">
	import LogoutIcon from "./icons/Logout.svelte";
	let { openModal } = $props()
</script>

<button class="p-3" onclick={openModal}>
	<LogoutIcon/>
	<p class="font-inter text-sm text-primary-content">Logout</p>
</button>
