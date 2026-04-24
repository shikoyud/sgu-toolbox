import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
    const { access_token, answer } = await request.json()

    const response = await fetch("https://thongtindaotao.sgu.edu.vn/public/api/zms/w-luutraloidanhgia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
            "ua": " "
        },
        body: JSON.stringify(answer)
    })

    const data = await response.json()
    return json(data)
}
