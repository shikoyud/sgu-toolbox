<script lang="ts">
	import { goto } from "$app/navigation";
	import { app } from "$lib/app.svelte";
	import { user } from "$lib/user.svelte";

	let { dialog = $bindable() } = $props()

	function handleLogout() {
		dialog.close()
		app.drawerOpen = false
		user.logout()
		goto("/login")
	}

</script>

<dialog bind:this={dialog} class="modal">
  <div class="modal-box">
    <h3 class="text-xl font-bold text-center">Are you sure you want to log out?</h3>
    <p class="text-lg py-4 text-center">Log out as {user.name}?</p>
		<div class="flex justify-center mb-5">
  		<button class="btn btn-secondary text-lg p-5" onclick={handleLogout}>Log out</button>
		</div>
		<div class="flex justify-center">
  		<button class="btn btn-soft text-lg p-5" onclick={() => dialog.close()}>Cancel</button>
		</div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
