import { SongData } from "./SongData.mjs";

var count = 0;

export class SongList{
	#name;
	#startAt;
	#position;
	#songs = [];

	constructor(list, startAt = 0, name = `New SongList ${count}`){
		this.#name = name;
		this.#startAt = startAt;
		if(list != null) this.addSongData(0, ...list.filter(value => value instanceof SongData));
		this.setPosition(this.#startAt);

		count++;
	}

	/* getter and setter*/
	get length(){
		return this.getLength();
	}

	set length(length){
		
	}

	get position(){
		return this.getPosition();
	}

	set position(pos){
		return this.setPosition(pos);
	}

	/* Conovert */
	toObject(){
		let self = this;
		return {
			"name": this.#name,
			"startAt": this.#startAt,
			"list": [...(function* (){ for(let i = 0; i < self.length; i++) yield self.get(i).toObject() })()],
		}
	}

	static parse(obj){
		return new SongList(obj["list"], obj["startAt"], obj["name"]);
	}

	/* methods to just get or modify parameters */

	getName(){
		return this.#name;
	}

	setName(name){
		if(name && name.length > 0) this.#name = name;
	}
	
	getPosition(){
		return this.#position;
	}

	setPosition(pos){
		if(this.getInRangeSign(pos) == null) throw new Error(`${pos} is not a number. Position must be an integer equals to or be larger than 0.`);
		else this.#position = [0, parseInt(pos), Math.max(0, this.getLength() - 1)][1 + this.getInRangeSign(pos)];

		return this.get(this.getPosition());
	}

	getInRangeSign(pos){
		if(isNaN(pos)) return null;
		else{
			if(pos < 0) return -1
			else if(pos > this.getLength() - 1) return 1
			else return 0;
		}
	}

	isInRange(pos){
		return this.getInRangeSign(pos) == 0;
 	}

	getLength(){
		return this.#songs.length;
	}

	getTitleList(){
		let result = [];
		for(let i = 0; i < this.getLength(); i++) result += this.#songs[i].getTitle();
	}

	/* Songs */

	get(pos = this.getPosition()){
		return this.getSongData(pos);
	}

	getSongData(pos = this.getPosition()){
		return this.isInRange(pos) ? this.#songs[parseInt(pos)] : null;
	}

	setSongData(pos, songdata){
		let sign = this.getInRangeSign(pos);
		if(songdata instanceof SongData && sign != null){
			pos = [0, parseInt(pos), this.getLength() - 1][1 + this.getInRangeSign(pos)];
			this.#songs[pos] = songdata;
		}
	}

	set(pos, songdata){
		this.setSongData(pos, songdata);
	}

	addSongData(pos = this.getLength(), ...songdatas){
		let sign = this.getInRangeSign(pos);
		songdatas.filter(value => value instanceof SongData,);
		
		if(sign != null){
			if(sign == -1) pos = 0;
			else if(sign == 1 && pos > this.getLength()) pos = this.getLength();

			this.#songs = [
				...this.#songs.slice(0, pos),
				...songdatas,
				...this.#songs.slice(pos)
			];
		}
	}

	add(pos = this.getLength(), ...songdatas){
		this.addSongData(pos, ...songdatas);
	}

	removeSongData(pos){
		if(this.isInRange(pos)){
			let target = this.get(parseInt(pos));
			this.#songs = [...this.#songs.slice(0, parseInt(pos)), ...this.#songs.slice(parseInt(pos) + 1)];
			return target;
		}
		return null;
	}

	remove(pos){
		return this.removeSongData(pos);
	}
}