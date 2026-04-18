<script lang="ts">
	import { goto } from "$app/navigation";
	import { user } from "$lib/user.svelte";
	import { fly } from "svelte/transition";

	let username = $state("")
	let password = $state("")
	let status = $state("")
	let allowLogin = $state(true)

	let usernameError = $state("");
	let passwordError = $state("");

	function validateInputs() {
		usernameError = "";
		passwordError = "";
		let valid = true;
		if (!username.trim()) {
			usernameError = "You can't leave this empty.";
			valid = false;
		}
		if (!password.trim()) {
			passwordError = "You can't leave this empty.";
			valid = false;
		}
		return valid;
	}

	async function handleLogin(){
		allowLogin = false
		if (!validateInputs()) {
			allowLogin = true
			return
		}
		const response = await fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password })
		})
		const data = await response.json()

		if (data.code == "403") {
			status = "failed"
			setTimeout(() => {
				allowLogin = true
			}, 1000)
		} else if (data.code == "200") {
			status = "success"
			setTimeout(() => {
				user.login(data.name, data.userName, data.access_token, data.refresh_token, data.expires_in)
				goto("/")
			}, 1500)
		} else {
			status = "unknown"
			setTimeout(() => {
				allowLogin = true
			}, 1000)
		}
	}

	$effect(() => {
		if (status !== "") {
			setTimeout(() => {
					status = ""
			}, 5000)
		}
	})
</script>

{#if status !== ""}
	<button class="toast toast-end z-20" onclick={() => status = ""}
		in:fly={{x:100 , duration: 300}}
		out:fly={{x:100, duration: 300}}
	>
		{#if status == "failed"}
			<div class="alert alert-error">
				<span>Login failed. Please check your username and password.</span>
			</div>
		{:else if status == "success"}
			<div class="alert alert-success">
				<span>Login successful.</span>
			</div>
		{:else if status == "unknown"}
			<div class="alert alert-error">
				<span>Unknown error. Please try again.</span>
			</div>
		{/if}
	</button>
{/if}

<form class="flex flex-col justify-around" onsubmit={handleLogin}>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend text-xl font-manrope font-extrabold">Log in to continue</legend>
    <label for="username" class="label font-inter">Username</label>
    <input id="username" type="username" bind:value={username}
			class="input validator {usernameError ? "input-error shake" : "input-secondary"}"/>
		{#if usernameError}
			<p class="mt-1 text-sm text-error">{usernameError}</p>
		{/if}
    <label for="password" class="label font-inter">Password</label>
    <input id="password" type="password" bind:value={password}
			class="input validator {passwordError ? "input-error shake" : "input-secondary"}" />
		{#if passwordError}
			<p class="mt-1 text-sm text-error">{passwordError}</p>
		{/if}
    <button class="btn btn-neutral mt-4 hover:scale-105 font-inter" onclick={handleLogin} disabled={!allowLogin}>
			{#if allowLogin === false}
				<span class="loading loading-spinner"></span>
			{:else}
				Log in
			{/if}
		</button>
  </fieldset>
</form>

<div class="w-80 mt-10">
	<details class="collapse bg-base-100 border border-base-300" name="login-accordion" open>
		<summary class="collapse-title font-semibold font-manrope text-primary-content">
			What do I use to log in?
		</summary>
		<div class="collapse-content text-sm font-inter">
			Use the same username and password you normally use for the official school portal:
			<a class="link link-primary" href="https://thongtindaotao.sgu.edu.vn">https://thongtindaotao.sgu.edu.vn</a>
		</div>
	</details>
	<details class="collapse bg-base-100 border border-base-300" name="login-accordion">
		<summary class="collapse-title font-semibold font-manrope text-primary-content">
			Does the server store my credentials?
		</summary>
		<div class="collapse-content text-sm font-inter">
			No. Your credentials are not stored on any server. They are sent directly to the school’s API.
		</div>
	</details>
	<!-- <details class="collapse bg-base-100 border border-base-300" name="login-accordion"> -->
	<!-- 	<summary class="collapse-title font-semibold font-manrope text-primary-content"> -->
	<!-- 		How can I verify this is safe? -->
	<!-- 	</summary> -->
	<!-- 	<div class="collapse-content text-sm font-inter"> -->
	<!-- 		You can inspect the source code on GitHub. There is no no tracking, and no code that sends your credentials anywhere except the official school API. -->
	<!-- 	</div> -->
	<!-- </details> -->
</div>

<style>
	.shake {
		animation: shake 0.25s ease-in-out;
	}

	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-4px); }
		50% { transform: translateX(4px); }
		75% { transform: translateX(-3px); }
	}
</style>
