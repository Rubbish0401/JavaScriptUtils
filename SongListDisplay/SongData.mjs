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
			if(obj instanceof SongData){
				this(obj.toObject());
			}else{
				if(obj.hasOwnProperty("title")) this.#title = obj["title"];
				if(obj.hasOwnProperty("descriptions")) this.#descriptions = obj["descriptions"];
				if(obj.hasOwnProperty("creators")) for(key in obj["creators"]) this.#creators[key] = obj["creators"][key];
			}
		}
	}

	/* Static methods */
	static *bulkConstructor(list){
		for(let i = 0; i < list.length; i++) yield new this(list[i]);
	}


	/* methods to just get or modify parameters */

	toObject(){
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

SongData.prototype.valueOf = function(){
	return this.toObject();
}