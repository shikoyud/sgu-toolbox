import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
    const { access_token } = await request.json()

    const response = await fetch("https://thongtindaotao.sgu.edu.vn/public/api/zms/w-locdsformdanhgia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
            "ua": " "
        },
        body: JSON.stringify({
            "filter": {
                "hoc_ky": 0,
                "is_english": false,
                "ma_form_danh_gia": null,
                "ten_form_danh_gia": null
            },
            "additional": {
                "paging": {
                    "limit": 99999,
                    "page": 1
                },
                "ordering": [{ "name": null, "order_type": null }]
            }
        })
    })

    const data = await response.json()
    return json(data)
}
