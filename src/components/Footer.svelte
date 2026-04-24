<script lang="ts">
	import GitHubIcon from "./icons/GitHub.svelte";

	const githubUrl = "https://github.com/shikoyud/sgu-toolbox";
	const authorName = "Shiko";
</script>

<footer class="p-8 text-center text-sm opacity-50 font-inter">
	<p class="mb-2">
		Made by
		<a href="https://facebook.com/nnyudd" target="_blank" rel="noopener noreferrer" class="font-bold hover:text-primary transition-colors">
			{authorName}
		</a>
	</p>
	<div class="flex justify-center gap-4">
		<a href={githubUrl} target="_blank" rel="noopener noreferrer" class="link link-hover"><GitHubIcon/></a>
	</div>
</footer>
