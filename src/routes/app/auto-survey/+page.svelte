<script lang="ts">
	import { answerSurvey, getSurveyList } from '$lib/sgu';
	import { user } from '$lib/user.svelte';
	import { fly } from 'svelte/transition';
	import AutoGenerateIcon from '$components/icons/AutoGenerate.svelte';
	import { extractSurveyItem } from '$lib/utilities';
	import { onMount } from 'svelte';

	let surveyList = $state<any[]>([]);
	let errorMessage = $state('');
	let isSuccess = $state(false)

	async function retrieveSurveyList() {
		surveyList = await getSurveyList(user.access_token);
		if (surveyList === null) {
			surveyList = [];
			errorMessage = 'Error while retrieving survey list. Please refresh the page and try again.';
			return;
		}
	}

	async function handleAutoSurvey(survey: any) {
		const surveyItemList = extractSurveyItem(survey.ds_doi_tuong)
		for (const item of surveyItemList) {
			console.log(item.item_name, item.id, item.item_id)
			let data = await answerSurvey(user.access_token, survey.id_form_danh_gia, item.id)
			if (data.code !== 200) {
				errorMessage = `Error while feedback course ${item.item_id}. Please try again.`;
				break;
			}
		}
		isSuccess = true
	}

	$effect(() => {
		if (isSuccess) {
			setTimeout(() => {
				isSuccess = false
			}, 5000)
		}
	})

	onMount(() => {
		retrieveSurveyList();
	});
</script>

{#if errorMessage !== ''}
	<button
		class="toast toast-end z-30"
		onclick={() => (errorMessage = '')}
		in:fly={{ x: 100, duration: 300 }}
		out:fly={{ x: 100, duration: 300 }}
	>
		<div class="alert alert-error">
			<span>{errorMessage}</span>
		</div>
	</button>
{/if}


{#if isSuccess}
	<button
		class="toast toast-end z-30"
		onclick={() => (errorMessage = '')}
		in:fly={{ x: 100, duration: 300 }}
		out:fly={{ x: 100, duration: 300 }}
	>
		<div class="alert alert-success">
			<span>Auto feedback success</span>
		</div>
	</button>
{/if}

<div class="flex flex-col justify-around items-center h-full w-full lg:w-3/5 p-8">
	<header class="text-center mt-12">
		<div class="inline-flex items-center justify-center text-primary mb-6 bg-primary/10 rounded-2xl p-2">
			<AutoGenerateIcon/>
		</div>
		<h1 class="font-manrope font-extrabold text-[2.3rem] mb-4">Auto Survey</h1>
		<p class="font-inter text-base-content/60 text-[1rem]">Skip the tedious form-filling. Complete all lecturer evaluations with a single click.</p>
	</header>
	<ul class="list bg-base-100 rounded-box shadow-md m-5">
		<li class="p-4 pb-2 text-xs opacity-60 tracking-wide">All surveys <span class="stat-desc">(click for mor detail)</span></li>
		{#each surveyList as survey}
			<li>
				<details class="collapse bg-base-100 border-base-300 border">
					<summary class="collapse-title font-semibold p-5">
						<div>
							<div>{survey.ten_form_danh_gia}</div>
							<div class="text-xs uppercase font-semibold opacity-60">{survey.ma_form_danh_gia}</div>
							<div class="flex justify-end">
								<button class="btn btn-primary"
									onclick={() => handleAutoSurvey(survey)}
									disabled={extractSurveyItem(survey.ds_doi_tuong).length === 0}
								>
									Auto feedback all
									<AutoGenerateIcon />
								</button>
							</div>
						</div>
					</summary>
					<div class="collapse-content text-sm">
						<div class="overflow-x-auto">
							{#if extractSurveyItem(survey.ds_doi_tuong).length === 0}
								<div class="stat-desc">This survey has been completed</div>
							{:else}
								<table class="table table-zebra">
									<thead>
										<tr>
											<th>Course ID</th>
											<th>Course name</th>
											<th>Lecturer name</th>
										</tr>
									</thead>
									<tbody>
										{#each extractSurveyItem(survey.ds_doi_tuong) as item}
											<tr>
												<td> {item.item_id} </td>
												<td> {item.item_name} </td>
												<td> {item.teacher_name} </td>
											</tr>
										{/each}
									</tbody>
								</table>
							{/if}
						</div>
					</div>
				</details>
			</li>
		{/each}
	</ul>
</div>
