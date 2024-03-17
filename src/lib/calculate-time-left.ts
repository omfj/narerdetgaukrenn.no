export const calculateTimeLeft = (date: Date) => {
	const now = new Date().getTime();
	const distance = date.getTime() - now;

	return {
		days: Math.floor(distance / (1000 * 60 * 60 * 24)),
		hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
		minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
		seconds: Math.floor((distance % (1000 * 60)) / 1000)
	};
};

export const millisecondsUntil = (date: Date) => {
	const now = new Date().getTime();
	const distance = date.getTime() - now;

	return distance;
};

export const secondsUntil = (date: Date) => {
	return Math.floor(millisecondsUntil(date) / 1000);
};

export const minutesUntil = (date: Date) => {
	return Math.floor(secondsUntil(date) / 60);
};

export const hoursUntil = (date: Date) => {
	return Math.floor(minutesUntil(date) / 60);
};

export const daysUntil = (date: Date) => {
	return Math.floor(hoursUntil(date) / 24);
};
