import { getCalendar } from "$lib/utilities";
import { error } from "@sveltejs/kit";
import type { RouteParams } from "./$types";

export async function GET({ params }: { params: RouteParams}) {
	const content = getCalendar(params.slug)
	if (!content) {
		throw error(404, "Calendar expired or not found. Please try again.")
	}
	return new Response(content, {
		headers: {
			"Content-Type": "text/calendar",
			"Content-Disposition": "attachment; filename='sgu_schedule.ics'",
			"Cache-Control": 'no-store'
		}
	})
}
