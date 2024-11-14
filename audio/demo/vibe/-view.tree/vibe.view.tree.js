	($.$mol_audio_demo_vibe) = class $mol_audio_demo_vibe extends ($.$mol_example_small) {
		room_status(next){
			return (this.Room().status(next));
		}
		active(next){
			return (this.Beep_vibe().active(next));
		}
		stop_at(next){
			return (this.Beep_vibe().stop_at(next));
		}
		freq(next){
			if(next !== undefined) return next;
			return 700;
		}
		Beep_vibe(){
			const obj = new this.$.$mol_audio_vibe();
			(obj.freq_default) = () => ((this.freq()));
			(obj.shape_default) = () => ((this.shape()));
			return obj;
		}
		duration_label(){
			return "Duration, s";
		}
		duration(next){
			if(next !== undefined) return next;
			return 0.5;
		}
		Duration_num(){
			const obj = new this.$.$mol_number();
			(obj.precision_change) = () => (0.05);
			(obj.value) = (next) => ((this.duration(next)));
			return obj;
		}
		Duration(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.duration_label()));
			(obj.content) = () => ([(this.Duration_num())]);
			return obj;
		}
		frequency_label(){
			return "Frequency, Hz";
		}
		Frequency_num(){
			const obj = new this.$.$mol_number();
			(obj.precision_change) = () => (50);
			(obj.value) = (next) => ((this.freq(next)));
			return obj;
		}
		Frequency(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.frequency_label()));
			(obj.content) = () => ([(this.Frequency_num())]);
			return obj;
		}
		shape_label(){
			return "Shape";
		}
		shape(next){
			if(next !== undefined) return next;
			return null;
		}
		Shape_select(){
			const obj = new this.$.$mol_select();
			(obj.Filter) = () => (null);
			(obj.value) = (next) => ((this.shape(next)));
			(obj.options) = () => ([
				"sine", 
				"square", 
				"sawtooth", 
				"triangle"
			]);
			return obj;
		}
		Shape(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.shape_label()));
			(obj.content) = () => ([(this.Shape_select())]);
			return obj;
		}
		beep_vibe_start_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Play_icon(){
			const obj = new this.$.$mol_icon_play();
			return obj;
		}
		Play_button(){
			const obj = new this.$.$mol_button_major();
			(obj.click) = (next) => ((this.beep_vibe_start_click(next)));
			(obj.sub) = () => ([(this.Play_icon()), "Play"]);
			return obj;
		}
		Room_status(){
			const obj = new this.$.$mol_audio_status();
			(obj.status) = (next) => ((this.room_status(next)));
			return obj;
		}
		Button_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Play_button()), (this.Room_status())]);
			return obj;
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Duration()), 
				(this.Frequency()), 
				(this.Shape()), 
				(this.Button_row())
			]);
			return obj;
		}
		title(){
			return "WebAudio API complex example";
		}
		Room(){
			const obj = new this.$.$mol_audio_room();
			(obj.input) = () => ([(this.Beep_vibe())]);
			return obj;
		}
		sub(){
			return [(this.List())];
		}
		tags(){
			return ["sound"];
		}
		aspects(){
			return ["Media/Audio"];
		}
	};
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "freq"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Beep_vibe"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "duration"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Duration_num"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Duration"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Frequency_num"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Frequency"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "shape"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Shape_select"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Shape"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "beep_vibe_start_click"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Play_icon"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Play_button"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Room_status"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Button_row"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "List"));
	($mol_mem(($.$mol_audio_demo_vibe.prototype), "Room"));

//# sourceMappingURL=vibe.view.tree.js.map