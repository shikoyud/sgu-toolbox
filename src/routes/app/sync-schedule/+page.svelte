<script lang="ts">
	import AppleIcon from "$components/icons/Apple.svelte";
	import GoogleIcon from "$components/icons/Google.svelte";
	import SyncIcon from "$components/icons/Sync.svelte";
	import { user } from "$lib/user.svelte";
	import { getRegisteredCourse, getTermList } from "$lib/sgu";
	import { buildCalendar, buildEvent, extractCourse, extractTerm } from "$lib/utilities";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	let isApple = $state(true)
	let isLoading = $state(true)
	let status = $state("term_select")
	let terms = $state<any[]>()
	let selectedTerm = $state()
	let errorMessage = $state("")
	let icsContent = $state()
	let slug = $state()


	async function handleGenerateICS() {
		isLoading = true
		const coursesData = await getRegisteredCourse(user.access_token, selectedTerm)
		if (coursesData === null) {
			errorMessage = "Error while retrieving registered course. Please refresh the page and try again."
			return
		}
		const events = []
		for (let course of coursesData) {
			const courseInfo = extractCourse(course)
			const event = buildEvent(courseInfo)
			events.push(event)
		}
		icsContent = buildCalendar(events)
		if (icsContent === null) {
			errorMessage = "Error while generating .ics file. Please refresh the page and try again."
			return
		}
		isLoading = false
		status = "ics_file_ready"
	}

	async function handleAppleImport() {
		isLoading = true
		// @ts-ignore
		const blob = new Blob([icsContent], { type: "text/calendar;charset=utf8" })
		const url = URL.createObjectURL(blob)
		window.location.href = url;
		isLoading = false
	}

	async function handleGoogleImport() {
		const newTab = window.open('about:blank', '_blank');
		isLoading = true
		const response = await fetch("/api/save-calendar", {
			method: "POST",
			body: JSON.stringify({ icsContent })
		})
		const data = await response.json()
		slug = data.slug
		const calendarUrl = `${window.location.origin}/ics/${slug}`
		const webcalUrl = calendarUrl.replace('https://', 'webcal://')
		const googleUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcalUrl)}`

		newTab!.location.href = googleUrl;
		isLoading = false
	}

	async function handleDownload() {
		// @ts-ignore
		const blob = new Blob([icsContent], { type: "application/octet-stream" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = `${selectedTerm}.ics`;
		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	$effect(() => {
		if (selectedTerm) {
			status = "term_select"
		}
	})

	onMount(() => {
		isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
		getTermList(user.access_token).then((t) => {
			if (t === null) {
				errorMessage = "Error while loading terms data. Please refresh the page and try again."
				return
			}
			isLoading = false
			terms = t
			selectedTerm = t[0].hoc_ky
		})
	});
</script>


{#if errorMessage !== ""}
	<button class="toast toast-end z-30" onclick={() => errorMessage = ""}
		in:fly={{x:100 , duration: 300}}
		out:fly={{x:100, duration: 300}}
	>
		<div class="alert alert-error">
			<span>{errorMessage}</span>
		</div>
	</button>
{/if}


<div class="flex flex-col justify-around items-center h-full w-full lg:w-3/5 p-8">
	<header class="text-center my-12">
		<div class="inline-flex items-center justify-center text-primary mb-6 bg-primary/10 rounded-2xl p-2">
			<SyncIcon/>
		</div>
		<h1 class="font-manrope font-extrabold text-[2.3rem] mb-4">Sync Schedule</h1>
		<p class="font-inter text-base-content/60 text-[1rem]">Sync your schedule with your calendar app in less than a minute.</p>
	</header>
	<div class="card flex flex-col items-center bg-base-200 border border-base-300 w-full p-5 shadow-2xl">
		<fieldset class="fieldset w-fit flex flex-col items-center mt-5 mb-10">
			<legend class="fieldset-legend text-start w-1/2 font-manrope">Select term</legend>
			<select class="select w-fit shadow-2xl" bind:value={selectedTerm}>
				{#each terms as term}
					<option value={term.hoc_ky} >{extractTerm(term)}</option>
				{/each}
			</select>
		</fieldset>
		<button onclick={handleGenerateICS} disabled={isLoading || status === "ics_file_ready"}
			class="btn btn-primary rounded-md w-3/4 shadow-xl text-lg lg:text-[1.2rem] p-5 mb-10">
			{#if isLoading}
				<span class="loading loading-spinner"></span>
			{:else}
				Generate .ics file
			{/if}
		</button>
	{#if status === "ics_file_ready"}
			<div class="p-8 text-center">
				<h1 class="font-manrope font-bold text-2xl mb-4">Your .ics file is ready</h1>
				<p class="text-base-content/60 text-lg">Select how you want to add it to your calendar.</p>
			</div>
			<div class="bg-base-300 flex justify-evenly p-1 rounded-xl mb-12 w-full shadow-xl">
				<button class="btn {isApple ? "bg-base-200" : "bg-base-300"} w-1/2 rounded-xl border-none"
					onclick={() => {isApple = true}}>
					iOS
				</button>
				<button class="btn {isApple ? "bg-base-300" : "bg-base-200"} w-1/2 rounded-xl border-none"
					onclick={() => {isApple = false}}>
					Android/Desktop
				</button>
			</div>
			{#if isApple}
				<div class="tooltip tooltip-open w-full m-0 p-0 flex justify-center" data-tip="Only works on Safari">
					<button class="btn font-inter text-sm flex items-center justify-center w-full lg:w-3/5 bg-primary rounded-md py-2 mb-3 hover:bg-primary/60" onclick={handleAppleImport} disabled={isLoading}>
						{#if isLoading}
							<span class="loading loading-spinner"></span>
						{:else}
							<AppleIcon/>
							Import to Apple Calendar
						{/if}
					</button>
				</div>
			{:else}
				<button class="btn font-inter text-sm flex items-center justify-center w-full lg:w-3/5 bg-primary rounded-md py-2 mb-3 hover:bg-primary/60" onclick={handleGoogleImport} disabled={isLoading}>
					{#if isLoading}
						<span class="loading loading-spinner"></span>
					{:else}
						<GoogleIcon/>
						Import to Google Calendar
					{/if}
				</button>
			{/if}
			<button class="opacity-50 hover:opacity-75 w-fit text-xs cursor-pointer text-center"
				onclick={handleDownload}>
				Just download .ics file
			</button>
	{/if}
	</div>
</div>


