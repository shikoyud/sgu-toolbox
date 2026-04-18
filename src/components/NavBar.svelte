<script>
	import Home from "./Home.svelte";
	import BurgerMenuIcon from "./icons/BurgerMenu.svelte";
	import ThemeSwitcher from "./ThemeSwitcher.svelte";

</script>
<div class="navbar bg-base-100 shadow-sm h-[8vh] w-screen flex justify-between px-4">
	<div class="lg:flex-none lg:hidden">
		<label for="drawer" class="btn drawer-button p-0 bg-transparent border-none">
			<BurgerMenuIcon/>
		</label>
	</div>
	<Home/>
	<ThemeSwitcher/>
</div>

