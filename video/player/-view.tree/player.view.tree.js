	($.$mol_video_player) = class $mol_video_player extends ($.$mol_view) {
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
		muted(){
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
		playing_event(next){
			if(next !== undefined) return next;
			return null;
		}
		play_event(next){
			if(next !== undefined) return next;
			return null;
		}
		pause_event(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "video";
		}
		playing(next){
			if(next !== undefined) return next;
			return false;
		}
		play(){
			return null;
		}
		pause(){
			return null;
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
				"src": (this?.uri()), 
				"controls": (this?.controls()), 
				"autoplay": (this?.autoplay()), 
				"playsinline": (this?.inline()), 
				"loop": (this?.loop()), 
				"muted": (this?.muted()), 
				"poster": (this?.poster())
			};
		}
		field(){
			return {"srcObject": (this?.stream())};
		}
		event(){
			return {
				"volumechange": (next) => (this?.revolume(next)), 
				"timeupdate": (next) => (this?.retime(next)), 
				"durationchange": (next) => (this?.redurate(next)), 
				"playing": (next) => (this?.playing_event(next)), 
				"play": (next) => (this?.play_event(next)), 
				"pause": (next) => (this?.pause_event(next))
			};
		}
	};
	($mol_mem(($.$mol_video_player.prototype), "revolume"));
	($mol_mem(($.$mol_video_player.prototype), "retime"));
	($mol_mem(($.$mol_video_player.prototype), "redurate"));
	($mol_mem(($.$mol_video_player.prototype), "playing_event"));
	($mol_mem(($.$mol_video_player.prototype), "play_event"));
	($mol_mem(($.$mol_video_player.prototype), "pause_event"));
	($mol_mem(($.$mol_video_player.prototype), "playing"));
	($mol_mem(($.$mol_video_player.prototype), "volume"));
	($mol_mem(($.$mol_video_player.prototype), "time"));

//# sourceMappingURL=player.view.tree.js.map