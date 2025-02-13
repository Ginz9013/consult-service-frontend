import dayjs from "dayjs";

export const formatDateString = (date: Date) => dayjs(date).format("YYYY-MM-DD");

export const formatBodyFat = (num: number | null) => num ? num * 100 : 0;

export const formatWeight = (num: number | null) => num ? num : 0;