<script lang="ts">
	import { app } from '$lib/app.svelte';
	import Home from './Home.svelte';
	import LogoutConfirmModal from './modals/LogoutConfirmModal.svelte';
	import User from './User.svelte';
	import Footer from './Footer.svelte';

	let { children } = $props();

	let logoutModal = $state<HTMLDialogElement>();
</script>

<div class="drawer lg:drawer-open">
	<input id="drawer" type="checkbox" class="drawer-toggle" bind:checked={app.drawerOpen} />
	<div class="drawer-content flex flex-col items-center h-screen lg:h-[92vh] overflow-y-auto">
		<div class="flex-1 w-full flex flex-col items-center justify-center">
			{@render children()}
		</div>
		<Footer />
	</div>
	<div class="drawer-side lg:h-[92vh] overflow-visible">
		<label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-200 min-h-full lg:w-60 w-75 p-0 flex flex-col justify-between">
			<div class="lg:hidden flex-none m-5">
				<Home />
			</div>
			<div class="flex-1">
				<li>
					<a
						class="font-inter p-4 m-0 text-left rounded-none"
						href="/app/sync-schedule"
						onclick={() => (app.drawerOpen = false)}
					>
						Sync Schedule
					</a>
				</li>
				<li>
					<a
						class="font-inter p-4 m-0 text-left rounded-none"
						href="/app/auto-survey"
						onclick={() => (app.drawerOpen = false)}
					>
						Auto Survey
					</a>
				</li>
				<li>
					<button class="font-inter pointer-events-none p-4 m-0 text-left">Coming soon...</button>
				</li>
			</div>
			<User openModal={() => logoutModal?.showModal()} />
		</ul>
	</div>
</div>

<LogoutConfirmModal bind:dialog={logoutModal} />
