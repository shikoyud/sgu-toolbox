import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
	const { username, password } = await request.json()

	const response = await fetch("https://thongtindaotao.sgu.edu.vn/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"ua": " "
		},
		body: new URLSearchParams({ username, password, grant_type: "password" })
	})

	const data = await response.json()
	return json(data)
}
