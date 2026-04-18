import { browser } from '$app/environment';


function appInit() {
	let darkTheme = "business"
	let lightTheme = "nord"
	let drawerOpen = $state(false)
	let currentTheme = $state(browser ? localStorage.getItem("theme") ?? darkTheme : darkTheme)
	let isDark = $derived(currentTheme === darkTheme);

	return {
		get darkTheme() { return darkTheme },
		get lightTheme() { return lightTheme },
		get drawerOpen() { return drawerOpen },
		get currentTheme() { return currentTheme },
		get isDark() { return isDark },
		set drawerOpen(input: boolean) { drawerOpen = input },

		refresh:() => {
			if (!browser) return

			drawerOpen = false
			currentTheme = localStorage.getItem("theme") ?? darkTheme
			document.documentElement.setAttribute("data-theme", currentTheme)
		},

		toggleTheme() {
			if (!browser) return

			currentTheme = currentTheme == darkTheme ? lightTheme : darkTheme
			document.documentElement.setAttribute("data-theme", currentTheme)
			localStorage.setItem("theme", currentTheme)
		}
	}
}

export const app = appInit()
