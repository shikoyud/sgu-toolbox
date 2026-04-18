export async function getTermList(access_token: string) {
	const response = await fetch("/api/get-term-list", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ access_token })
	})
	const data = await response.json()
	if (data.code !== 200) return null
	return data.data.ds_hoc_ky
}


export async function getRegisteredCourse(access_token: string, term: any) {
	const response = await fetch("/api/get-registered-course", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ access_token, term })
	})
	const data = await response.json()
	if (data.code !== 200) return null
	return data.data.ds_nhom_to
}
