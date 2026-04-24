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

export async function getSurveyList(access_token: string) {
	const response = await fetch("/api/get-survey-list", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ access_token })
	})
	const data = await response.json()
	if (data.code !== 200) return null
	return data.data.ds_form_danh_gia
}


export async function answerSurvey(access_token: string, form_id: string, item_id: string) {
	const answer = {
		"ds_tra_loi": [
			{},
			{ "thu_tu_cau_hoi": 1, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 2, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 3, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 4, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 5, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 6, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 7, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 8, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 9, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 10, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 11, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 12, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 13, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 14, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 15, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 16, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 17, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 18, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 19, "tra_loi_danh_gia": "5", "tra_loi_khac": "" },
			{ "thu_tu_cau_hoi": 20, "tra_loi_danh_gia": "", "tra_loi_khac": "" }
		],
		"filter": {
			"is_tieng_anh": true,
			"id_form_danh_gia": form_id,
			"id_ds_doi_tuong": item_id
		}
	}
	const response = await fetch("/api/anwser-survey", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ access_token, answer })
	})
	const data = await response.json()
	return data
}