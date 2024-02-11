	($.$mol_video_player_demo) = class $mol_video_player_demo extends ($.$mol_example_large) {
		title(){
			return "Reactive video player";
		}
		sub(){
			return [(this.Controls()), (this.Player())];
		}
		tags(){
			return ["palyback"];
		}
		aspects(){
			return ["Media/Video"];
		}
		files(){
			return (this.Open().files());
		}
		Open(){
			const obj = new this.$.$mol_button_open();
			return obj;
		}
		Playing_icon(){
			const obj = new this.$.$mol_icon_play();
			return obj;
		}
		Playing(){
			const obj = new this.$.$mol_check_icon();
			(obj.checked) = (next) => ((this.playing(next)));
			(obj.Icon) = () => ((this.Playing_icon()));
			return obj;
		}
		Duration(){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.duration())]);
			return obj;
		}
		Duration_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Duration");
			(obj.content) = () => ([(this.Duration())]);
			return obj;
		}
		Time(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.time(next)));
			(obj.precision_view) = () => (0.001);
			return obj;
		}
		Time_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Time");
			(obj.content) = () => ([(this.Time())]);
			return obj;
		}
		Volume(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.volume(next)));
			(obj.precision) = () => (0.001);
			return obj;
		}
		Volume_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Volume");
			(obj.content) = () => ([(this.Volume())]);
			return obj;
		}
		Controls(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this.Open()), 
				(this.Playing()), 
				(this.Duration_labeler()), 
				(this.Time_labeler()), 
				(this.Volume_labeler())
			]);
			return obj;
		}
		uri(){
			return "";
		}
		playing(next){
			return (this.Player().playing(next));
		}
		volume(next){
			return (this.Player().volume(next));
		}
		time(next){
			return (this.Player().time(next));
		}
		duration(){
			return (this.Player().duration());
		}
		Player(){
			const obj = new this.$.$mol_video_player();
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
	};
	($mol_mem(($.$mol_video_player_demo.prototype), "Open"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Playing_icon"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Playing"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Duration"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Duration_labeler"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Time"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Time_labeler"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Volume"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Volume_labeler"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Controls"));
	($mol_mem(($.$mol_video_player_demo.prototype), "Player"));

//# sourceMappingURL=demo.view.tree.js.map