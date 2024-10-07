export class SongData{
	#title = "";
	#descriptions = "";
	
	#creators = {
		composer: [],
		lyricist: [],
		arranger: [],
		publisher: [],
	};
	

	constructor(obj){
		if(obj != null){
			if(obj.hasOwnProperty("title")) this.#title = obj["title"];
			if(obj.hasOwnProperty("descriptions")) this.#descriptions = obj["descriptions"];
			if(obj.hasOwnProperty("creators")) for(key in obj["creators"]) this.#creators[key] = obj["creators"][key];
		}
	}

	/* Static methods */

	/* methods to just get or modify parameters */

	toPrototypeObject(){
		return {
			"title": this.#title,
			"descriptions": this.#descriptions,
			"creators": this.#creators,
		}
	}

	getTitle(){
		return this.#title;
	}

	setTitle(title){
		this.#title = title;
	}

	getDescriptions(){
		return this.#descriptions;
	}

	setDescriptions(descriptions){
		this.#descriptions = descriptions;
	}

	getCreators(key){
		return this.#creators.hasOwnProperty(key) ? this.#creators[key] : this.#creators;
	}

	addCreators(key, ...creators){
		if(!this.#creators.hasOwnProperty(key)) this.#creators[key] = [];
		this.#creators[key].push(...creators);
	}

	removeCreators(key, ...creators){
		return this.#creators[key].filter(value => creators.indexOf(value));
	}
}

SongList.prototype.valueOf = function(){
	return this.toPrototypeObject();
}