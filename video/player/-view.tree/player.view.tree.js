	($.$mol_video_player) = class $mol_video_player extends ($.$mol_view) {
		dom_name(){
			return "video";
		}
		playing(next){
			if(next !== undefined) return next;
			return false;
		}
		volume(next){
			if(next !== undefined) return next;
			return 0;
		}
		time(next){
			if(next !== undefined) return next;
			return 0;
		}
		duration(){
			return 0;
		}
		attr(){
			return {
				"src": (this.uri()), 
				"controls": (this.controls()), 
				"autoplay": (this.autoplay()), 
				"playsinline": (this.inline()), 
				"loop": (this.loop()), 
				"poster": (this.poster())
			};
		}
		field(){
			return {"srcObject": (this.stream())};
		}
		event(){
			return {
				"volumechange": (next) => (this.revolume(next)), 
				"timeupdate": (next) => (this.retime(next)), 
				"durationchange": (next) => (this.redurate(next)), 
				"playing": (next) => (this.play_started(next)), 
				"play": (next) => (this.play(next)), 
				"pause": (next) => (this.pause(next))
			};
		}
		uri(){
			return "";
		}
		controls(){
			return true;
		}
		autoplay(){
			return true;
		}
		inline(){
			return true;
		}
		loop(){
			return false;
		}
		poster(){
			return "";
		}
		stream(){
			return null;
		}
		revolume(next){
			if(next !== undefined) return next;
			return null;
		}
		retime(next){
			if(next !== undefined) return next;
			return null;
		}
		redurate(next){
			if(next !== undefined) return next;
			return null;
		}
		play_started(next){
			if(next !== undefined) return next;
			return null;
		}
		play(next){
			if(next !== undefined) return next;
			return null;
		}
		pause(next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem(($.$mol_video_player.prototype), "playing"));
	($mol_mem(($.$mol_video_player.prototype), "volume"));
	($mol_mem(($.$mol_video_player.prototype), "time"));
	($mol_mem(($.$mol_video_player.prototype), "revolume"));
	($mol_mem(($.$mol_video_player.prototype), "retime"));
	($mol_mem(($.$mol_video_player.prototype), "redurate"));
	($mol_mem(($.$mol_video_player.prototype), "play_started"));
	($mol_mem(($.$mol_video_player.prototype), "play"));
	($mol_mem(($.$mol_video_player.prototype), "pause"));

//# sourceMappingURL=player.view.tree.js.map