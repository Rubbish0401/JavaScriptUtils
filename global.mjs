import { StringProcess } from "./StringProcess.mjs";

export function delay(duration, func) {
	return new Promise(resolve => {
		setTimeout(() => {
			if (func) func();
			resolve();
		}, duration);
	});
}

export function downloadByUrl(url, filename) {
	if (!(filename.length > 0)) {
		let now = new Date();
		filename = [
			StringProcess.fillChars(String(now.getFullYear()), 4, "0"),
			StringProcess.fillChars(String(now.getMonth() + 1), 2, "0"),
			StringProcess.fillChars(String(now.getDate()), 2, "0"),
			StringProcess.fillChars(String(now.getHours()), 2, "0"),
			StringProcess.fillChars(String(now.getMinutes()), 2, "0"),
			StringProcess.fillChars(String(now.getSeconds()), 2, "0"),
			StringProcess.fillChars(String(now.getMilliseconds()), 3, "0"),
		].join("");
	}

	let anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	anchor.remove();
}

export function range(n){
	return [...(function*(){
		for(let i = 0; i < n; i++) yield i;
	})()];
}

export function wait(duration){
	return delay(duration, null);
}