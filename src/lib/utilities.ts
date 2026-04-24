import { createEvents } from "ics"

export function extractSurveyItem(surveyItems: any) {
	let item_list = []
	for (const item of surveyItems) {
		if (item.is_tra_loi) continue
		const id = item.id_ds_doi_tuong
		const item_id = item.ma_doi_tuong
		const item_name = item.ten_doi_tuong
		const teacher_name = item.ten_bo_sung
		item_list.push({id, item_id, item_name, teacher_name})
	}
	return item_list
}

export function extractTerm(data: any) {
	const term = data.hoc_ky
	const year = Math.trunc(term / 10)
	return `Term ${term % 10} (${year} - ${year + 1})`
}

export function extractCourse(data: any) {
	const courseID = data.ma_mon
	const courseName = data.ten_mon
	const group = data.nhom_to
	const classroom = data.phong
	const teacher = data.gv
	const startTime = data.tu_gio
	const endTime = data.den_gio
	const dayOfWeek = data.thu
	const dateRange = data.tkb

	return {
		courseID, courseName, group, classroom, teacher, startTime, endTime, dayOfWeek, dateRange
	}
}

function extractDateTime(data: any) {
	const dateRange = data.dateRange
	const startTimeStr = data.startTime
	const endTimeStr = data.endTime

	let trimmedDate = dateRange.split(" ")
	let trimmedStartTime= startTimeStr.split(":")
	let trimmedEndTime= endTimeStr.split(":")

	let startDateStr = trimmedDate[0].split("/")
	let startYear = Number.parseInt(startDateStr[2]) + 2000
	let startMonth = Number.parseInt(startDateStr[1])
	let startDay = Number.parseInt(startDateStr[0])
	let startHour = Number.parseInt(trimmedStartTime[0])
	let startMinute = Number.parseInt(trimmedStartTime[1])

	let endDateStr = trimmedDate[2].split("/")
	let endYear = Number.parseInt(endDateStr[2]) + 2000
	let endMonth = Number.parseInt(endDateStr[1])
	let endDay = Number.parseInt(endDateStr[0])
	let endHour = Number.parseInt(trimmedEndTime[0])
	let endMinute = Number.parseInt(trimmedEndTime[1]) + 50

	const startDate = [startYear, startMonth, startDay]

	const pad = (n: number) => String(n).padStart(2, "0")

	return {
		start: ([...startDate, startHour, startMinute]),
		end: ([...startDate, endHour + Math.trunc(endMinute / 60), endMinute > 60 ? endMinute - 60 : endMinute]),
		until: String(endYear) + pad(endMonth) + pad(endDay) + "T" + "235959"
	}
}

export function buildEvent(courseInfo: any) {
	const { start, end, until } = extractDateTime(courseInfo)
	const title = `${courseInfo.courseName} (${courseInfo.courseID})`
	const description = `Giảng viên: ${courseInfo.teacher}\nNhóm tổ: ${courseInfo.group}`
	const location = courseInfo.classroom
	const recurrenceRule = `FREQ=WEEKLY;UNTIL=${until}`

	return {
		start, end, title, description, location, recurrenceRule
	}
}

export function buildCalendar(events: any[]) {
	const { error, value } = createEvents(events)
	if (error) {
		console.log(error)
		return null
	}
	return value
}

type CalendarEntry = {
    content: string;
    expiresAt: number;
};
const calendarStore = new Map<string, CalendarEntry>();

export function saveCalendar(slug: string, content: string) {
    const fifteenMinute = 60 * 15 * 1000;
    calendarStore.set(slug, {
        content,
        expiresAt: Date.now() + fifteenMinute
    });
    setTimeout(() => {
        calendarStore.delete(slug);
    }, fifteenMinute);
}

export function getCalendar(slug: string) {
    const entry = calendarStore.get(slug);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
        calendarStore.delete(slug);
        return null;
    }
    return entry.content;
}
