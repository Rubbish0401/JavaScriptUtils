import { SongData } from "./SongData";

export class SongList{
	#position;
	#songs = [];

	constructor(list, startAt = 0){
		this.addSongData(0, list);
		this.setPosition(startAt);
	}

	/* methods to just get or modify parameters */
	
	getPosition(){
		return this.#position;
	}

	setPosition(pos){
		if(this.getInRangeSign(pos) == null) throw new Error(`${pos} is not a number. Position must be an integer equals to or be larger than 0.`);
		else this.#position = [0, parseInt(pos), this.getLength() - 1][1 + this.getInRangeSign(pos)];

		return this.getPosition();
	}

	getInRangeSign(pos){
		if(isNaN(pos)) return null;
		else{
			if(pos < 0) return -1
			else if(pos > this.getLength() - 1) return 1
			else return 0;
		}
	}

	getLength(){
		return this.#songs.length;
	}

	getTitleList(){
		let result = [];
		for(let i = 0; i < this.getLength(); i++) result += this.#songs[i].getTitle();
	}

	/* Songs */

	getSongData(pos = this.getPosition()){
		return this.getInRangeSign(pos) == 0 ? this.#songs[parseInt(pos)] : null;
	}

	setSongData(pos, songdata){
		let sign = this.getInRangeSign(pos);
		if(songdata instanceof SongData && sign != null){
			pos = [0, parseInt(pos), this.getLength() - 1][1 + this.getInRangeSign(pos)];
			this.#songs[pos] = songdata;
		}
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
}