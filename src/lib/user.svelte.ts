import { browser } from '$app/environment';

function createUser() {
	let isLoggedIn = $state(browser ? localStorage.getItem("isLoggedIn") === "true" : false)
	let name = $state(browser ? localStorage.getItem("name") ?? "" : "")
	let userName = $state(browser ? localStorage.getItem("userName") ?? "" : "")
	let expires_at = $state(browser ? Number.parseInt(localStorage.getItem("expires_at") ?? "-1") : -1)
	let access_token = $state(browser ? localStorage.getItem("access_token") ?? "" : "")
	let refresh_token = $state(browser ? localStorage.getItem("refresh_token") ?? "" : "")

	return {
		get isLoggedIn() { return isLoggedIn },
		get name() { return name },
		get userName() { return userName },
		get expires_at() { return expires_at },
		get access_token() { return access_token },
		get refresh_token() { return refresh_token },

		refresh:() => {
			if (!browser) return;

			isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
			name = localStorage.getItem("name") ?? ""
			userName = localStorage.getItem("userName") ?? ""
			expires_at = Number.parseInt(localStorage.getItem("expires_at") ?? "-1")
			access_token = localStorage.getItem("access_token") ?? ""
			refresh_token = localStorage.getItem("refresh_token") ?? ""
		},

		login: (newName: string, newuserName: string, newAccessToken: string, newRefreshToken: string, expires_in: number) => {
			if (!browser) return;

			isLoggedIn = true
			name = newName
			userName = newuserName
			expires_at = Date.now() + expires_in * 1000
			access_token = newAccessToken
			refresh_token = newRefreshToken

			localStorage.setItem("isLoggedIn", "true")
			localStorage.setItem("name", newName)
			localStorage.setItem("userName", newuserName)
			localStorage.setItem("expires_at", expires_at.toString())
			localStorage.setItem("access_token", newAccessToken)
			localStorage.setItem("refresh_token", newRefreshToken)
		},

		logout: () => {
			if (!browser) return;

			isLoggedIn = false
			name = ""
			userName = ""
			expires_at = -1
			access_token = ""
			refresh_token = ""

			localStorage.setItem("isLoggedIn", "false")
			localStorage.setItem("name", "")
			localStorage.setItem("userName", "")
			localStorage.setItem("expires_at", "-1")
			localStorage.setItem("access_token", "")
			localStorage.setItem("refresh_token", "")
		}
	}
}

export const user = createUser()
