function delay(duration, func){
    return new Promise(resolve => {
        setTimeout(() => {
            if(func) func();
            resolve();
        }, duration);
    });
}

function downloadByUrl(url, filename){
	if(!(filename.length > 0)){
		let now = new Date();
		filename = [
			now.getFullYear(),
			now.getMonth() + 1,
			now.getDate(),
			now.getHours(),
			now.getMinutes(),
			now.getSeconds(),
			now.getMilliseconds()
		].join("");
	}

	let anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	anchor.remove();
}