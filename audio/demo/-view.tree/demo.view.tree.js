	($.$mol_audio_demo) = class $mol_audio_demo extends ($.$mol_example_small) {
		beep_status(next){
			return (this.Beep_room().status(next));
		}
		beep_play(){
			return (this.Beep_track().start());
		}
		Beep_track(){
			const obj = new this.$.$mol_audio_melody();
			(obj.note_length) = () => (.5);
			(obj.notes) = () => ("e");
			return obj;
		}
		noise_status(next){
			return (this.Noise_room().status(next));
		}
		noise_active(next){
			return (this.Noise().active(next));
		}
		noise_stop_at(next){
			return (this.Noise().stop_at(next));
		}
		noise_freq(){
			return 0;
		}
		Noise(){
			const obj = new this.$.$mol_audio_vibe();
			(obj.freq_default) = () => ((this.noise_freq()));
			return obj;
		}
		beep_play_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Beep_play(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.beep_play_click(next)));
			(obj.title) = () => ("Beep");
			return obj;
		}
		Beep_status(){
			const obj = new this.$.$mol_audio_status();
			(obj.status) = (next) => ((this.beep_status(next)));
			return obj;
		}
		Beep_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Beep_play()), (this.Beep_status())]);
			return obj;
		}
		noise_play_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Noise_play(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.noise_play_click(next)));
			(obj.title) = () => ("Noise");
			return obj;
		}
		Noise_status(){
			const obj = new this.$.$mol_audio_status();
			(obj.status) = (next) => ((this.noise_status(next)));
			return obj;
		}
		Nouse_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Noise_play()), (this.Noise_status())]);
			return obj;
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Beep_row()), (this.Nouse_row())]);
			return obj;
		}
		title(){
			return "WebAudio API example";
		}
		Beep_room(){
			const obj = new this.$.$mol_audio_room();
			(obj.input) = () => ([(this.Beep_track())]);
			return obj;
		}
		Noise_room(){
			const obj = new this.$.$mol_audio_room();
			(obj.input) = () => ([(this.Noise())]);
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
	($mol_mem(($.$mol_audio_demo.prototype), "Beep_track"));
	($mol_mem(($.$mol_audio_demo.prototype), "Noise"));
	($mol_mem(($.$mol_audio_demo.prototype), "beep_play_click"));
	($mol_mem(($.$mol_audio_demo.prototype), "Beep_play"));
	($mol_mem(($.$mol_audio_demo.prototype), "Beep_status"));
	($mol_mem(($.$mol_audio_demo.prototype), "Beep_row"));
	($mol_mem(($.$mol_audio_demo.prototype), "noise_play_click"));
	($mol_mem(($.$mol_audio_demo.prototype), "Noise_play"));
	($mol_mem(($.$mol_audio_demo.prototype), "Noise_status"));
	($mol_mem(($.$mol_audio_demo.prototype), "Nouse_row"));
	($mol_mem(($.$mol_audio_demo.prototype), "List"));
	($mol_mem(($.$mol_audio_demo.prototype), "Beep_room"));
	($mol_mem(($.$mol_audio_demo.prototype), "Noise_room"));

//# sourceMappingURL=demo.view.tree.js.map