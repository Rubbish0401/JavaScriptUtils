/*
	参照: https://ja.wikipedia.org/wiki/%E8%89%B2%E7%A9%BA%E9%96%93
	参照: https://ja.wikipedia.org/wiki/HSL%E8%89%B2%E7%A9%BA%E9%96%93%E3%81%A8HSV%E8%89%B2%E7%A9%BA%E9%96%93
*/

/*
	Colour Class constructor's argument

	// HTML Colour Code
	3 or 6 digits RGB, 4 or 8 digits RGBA
	#ABC, #ABCDEF, #ABC0, #ABCDEF01

	// Object
	RGBA
	{
		type: "RGBA",
		R: 255,
		G, 127,
		B: 63,
		A: 31
	}

	HSL and Alpha
	{
		type: "HSLA",
		H: 0,
		S: 0,
		L: 0,
		A: 0
	}

	HSV and Alpha
	{
		type: "HSVA",
		H: 0,
		S: 0,
		V: 0,
		A: 0
	}
*/

class Colour{
	#RGBA = {
		R: null,
		G: null,
		B: null,
		A: null,
	};

	static WHITE = new this("#FFFFFF");
	static RED = new this("#FF0000");
	static GREEN = new this("#00FF00");
	static BLUE = new this("#0000FF");
	static CYAN = new this("#00FFFF");
	static MAGENTA = new this("#FF00FF");
	static YELLOW = new this("#FFFF00");
	static BLACK = new this("#000000");

	constructor(info){
		if(typeof info == "string" && info.charAt(0) == "#"){
			info = info.substring(1);
			
			if(!info.match(/[^0-9|A-F|a-f]/g)){
				if(info.length == 3 || info.length == 4) info = StringProcess.modShift(StringProcess.repeat(info, 2), info.length);

				if(info.length == 6 || info.length == 8){
					this.#RGBA.R = parseInt(info.substring(0, 2), 16);
					this.#RGBA.G = parseInt(info.substring(2, 4), 16);
					this.#RGBA.B = parseInt(info.substring(4, 6), 16);
					this.#RGBA.A = info.length > 6 ? parseInt(info.substring(6, 8), 16) : 255;
				}
			}
		}else if(typeof info == "object" && ["RGBA", "HSLA", "HSVA"].indexOf(info.type) != -1) switch(info.type){
			case "RGBA":
				this.#RGBA.R = info.R || 0;
				this.#RGBA.G = info.G || 0;
				this.#RGBA.B = info.B || 0;
				this.#RGBA.A = info.A ? info.A : 255;
				break;

			case "HSLA":
				break;

			case "HSVA":
				break;
		}else{
			throw new Error("Only HTML Colour Code or RGB, HSL, HSV object can use.");
		}
	}

	static isColour(obj){
		return obj instanceof Colour;
	}

	static blend(...colours){
		if(colours.length > 0){
			let result = {
				type: "RGBA",
				R: 0,
				G: 0,
				B: 0,
				A: 0,
			};

			for(let i = 0; i < colours.length; i++){
				let colour = colours[i].getRGBA();

				result.R += colour.R;
				result.G += colour.G;
				result.B += colour.B;
				result.A += colour.A;
			}

			result.R = Math.round(result.R / colours.length);
			result.G = Math.round(result.G / colours.length);
			result.B = Math.round(result.B / colours.length);
			result.A = Math.round(result.A / colours.length);
	
			return new Colour(result);
		}
	}

	getRGBA(){
		return this.#RGBA;
	}

	getHSL(){
		let M = Math.max(this.#RGBA.R, this.#RGBA.G, this.#RGBA.B), m = Math.min(this.#RGBA.R, this.#RGBA.G, this.#RGBA.B);
		let chroma = M - m;
	}

	getHSV(){

	}

	getRGBCode(){
		let r = StringProcess.fillChars(this.#RGBA.R.toString(16), 2, "0"),
		g = StringProcess.fillChars(this.#RGBA.G.toString(16), 2, "0"),
		b = StringProcess.fillChars(this.#RGBA.B.toString(16), 2, "0");

		return `#${r}${g}${b}`.toUpperCase();
	}

	getRGBACode(){
		let r = StringProcess.fillChars(this.#RGBA.R.toString(16), 2, "0"),
		g = StringProcess.fillChars(this.#RGBA.G.toString(16), 2, "0"),
		b = StringProcess.fillChars(this.#RGBA.B.toString(16), 2, "0"),
		a = StringProcess.fillChars(this.#RGBA.A.toString(16), 2, "0");

		return `#${r}${g}${b}${a}`.toUpperCase();
	}
}