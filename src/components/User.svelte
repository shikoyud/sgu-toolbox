<script lang="ts">
	import { user } from "$lib/user.svelte";
	import Logout from "./Logout.svelte";

	let { openModal } = $props()

</script>

{#if user.isLoggedIn === true}
	<div class="cursor-pointer dropdown dropdown-top">
  	<div class="flex items-center bg-base-100" tabindex="0" role="button">
  		<div class="avatar avatar-placeholder m-3 shrink-0">
  			<div class="bg-neutral text-neutral-content w-9 rounded-full">
  				<span class="text-xs font-inter font-bold">{(user.name.trim().split(" ").pop() || " ").at(0)}</span>
  			</div>
  		</div>
  		<div class="flex flex-col py-3 mr-5 min-w-0">
  			<span class="font-inter text-sm font-bold">{user.name}</span>
  			<span class="font-inter text-xs opacity-60">{user.userName}</span>
  		</div>
		</div>
		<ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-sm">
			<li><Logout { openModal }/></li>
		</ul>
	</div>
{/if}
