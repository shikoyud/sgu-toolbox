import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
	const { access_token, term } = await request.json()

	const response = await fetch("https://thongtindaotao.sgu.edu.vn/public/api/sch/w-locdstkbhockytheodoituong", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${access_token}`,
			"ua": " "
		},
		body: JSON.stringify({
			"hoc_ky": term,
			"loai_doi_tuong": 1,
			"id_du_lieu": null
		})
	})

	const data = await response.json()
	return json(data)
}
