import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
	const { access_token } = await request.json()

	const response = await fetch("https://thongtindaotao.sgu.edu.vn/public/api/sch/w-locdshockytkbuser", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${access_token}`,
			"ua": " "
		},
		body: JSON.stringify({
			"filter":{ "is_tieng_anh":null },
			"additional":{
				"paging":{ "limit":100, "page":1 },
				"ordering":[{ "name":"hoc_ky", "order_type":1 }]
			}
		})
	})

	const data = await response.json()
	return json(data)
}
