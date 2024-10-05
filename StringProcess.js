class StringProcess{
	static repeat(str, times){
		if(times == 0) return "";
		else if(times > 0){
			str = String(str);
			let result = "";
			for(let i = 0; i < times; i++) result += str;

			return result;
		}
	}

	static fillChars(str, length, char, side = 0){
		let filler = StringProcess.repeat(char, length - str.length);
		return (side == 0 ? filler : "") + str + (side == 1 ? filler : "")
	}

	static invert(str){
		str = String(str);
		let result = "";
		for(let i = 0; i < str.length; i++) result += str.charAt(str.length - 1 - i);

		return result;
	}

	static shift(str, pos = 0){
		str = String(str);
		pos = ((pos % str.length) + str.length) % str.length;
		let result = str.substring(str.length - pos) + str.substring(0, str.length - pos);

		return result;
	}

	static modShift(str, pos = 1){
		str = String(str);
		let result = "";
		for(let i = 0; i < pos; i++) for(let j = 0; j < str.length / pos; j++) result += str.charAt(pos * j + i);

		return result;
	}

	static splitByLength(str, length){
		str = String(str);
		let result = [];
		for(let i = 0; i < str.length / length; i++) result.push(str.substring(length * i, length * (i + 1)));

		return result;
	}

	static countChars(str){
		str = String(str);
		let result = {};
		for(let i = 0; i < str.length; i++){
			let char = str.charAt(i);
			if(result[char]) result[char]++;
			else result[char] = 1;
		}

		return result;
	}

	static listOfChars(str){
		str = String(str);
		let result = [];
		for(let i = 0; i < str.length; i++) if(result.indexOf(str.charAt(i)) == -1) result.push(str.charAt(i));

		return result;
	}
}