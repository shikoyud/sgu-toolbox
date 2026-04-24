import { saveCalendar } from "$lib/utilities"
import { json } from "@sveltejs/kit"

export async function POST({ request }: { request: Request }) {
	const { icsContent } = await request.json()
	const slug = Math.random().toString(36) .substring(2, 8)
	saveCalendar(slug, icsContent)
	return json({ slug })
}
