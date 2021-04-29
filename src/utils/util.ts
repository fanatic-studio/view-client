export function timeFix() {
	const time = new Date();
	const hour = time.getHours();
	return hour < 9
		? "早上好"
		: hour <= 11
		? "上午好"
		: hour <= 13
		? "中午好"
		: hour < 20
		? "下午好"
		: "晚上好";
}

export function welcome() {
	const arr = ["休息一会儿吧", "准备吃什么呢?", "我猜你可能累了"];
	const index = Math.floor(Math.random() * arr.length);
	return arr[index];
}

export function getWeek(dt: any) {
	let d1: any = new Date(dt);
	let d2: any = new Date(dt);
	d2.setMonth(0);
	d2.setDate(1);
	let rq = d1 - d2;
	let days = Math.ceil(rq / (24 * 60 * 60 * 1000));
	let num = Math.ceil(days / 7);
	return num;
}

export function StoreResult(s: boolean, d: any) {
	const res = {
		status: s,
		data: d,
	};

	return res;
}
