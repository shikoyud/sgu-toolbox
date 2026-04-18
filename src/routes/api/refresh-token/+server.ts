import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
	const { refresh_token } = await request.json()

	const response = await fetch("https://thongtindaotao.sgu.edu.vn/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"ua": " "
		},
		body: new URLSearchParams({ refresh_token, grant_type: "refresh_token" })
	})

	const data = await response.json()
	return json(data)
}
