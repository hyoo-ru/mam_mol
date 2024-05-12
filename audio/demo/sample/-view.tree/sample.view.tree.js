	($.$mol_audio_demo_sample) = class $mol_audio_demo_sample extends ($.$mol_example_small) {
		room_status(next){
			return (this?.Room()?.status(next));
		}
		sample_active(next){
			return (this?.Sample()?.active(next));
		}
		start(){
			return (this?.Sample()?.start());
		}
		loop(next){
			return (this?.Sample()?.loop(next));
		}
		sample_buffer(){
			return null;
		}
		Sample(){
			const obj = new this.$.$mol_audio_sample();
			(obj.loop_default) = () => (true);
			(obj.buffer) = () => ((this?.sample_buffer()));
			return obj;
		}
		sample_url(next){
			if(next !== undefined) return next;
			return "/mol/audio/demo/sample/drumloop.ogg";
		}
		Sample_url(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this?.sample_url(next)));
			return obj;
		}
		Sample_url_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Sample url");
			(obj.control) = () => ((this?.Sample_url()));
			return obj;
		}
		Active_icon(){
			const obj = new this.$.$mol_icon_play();
			return obj;
		}
		Active(){
			const obj = new this.$.$mol_check_icon();
			(obj.checked) = (next) => ((this?.sample_active(next)));
			(obj.title) = () => ("Active");
			(obj.Icon) = () => ((this?.Active_icon()));
			return obj;
		}
		start_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Start(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this?.start_click(next)));
			(obj.title) = () => ("Start");
			return obj;
		}
		Loop_icon(){
			const obj = new this.$.$mol_icon_loop();
			return obj;
		}
		Loop(){
			const obj = new this.$.$mol_check_icon();
			(obj.checked) = (next) => ((this?.loop(next)));
			(obj.title) = () => ("Loop");
			(obj.Icon) = () => ((this?.Loop_icon()));
			return obj;
		}
		Controls(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this?.Active()), 
				(this?.Start()), 
				(this?.Loop())
			]);
			return obj;
		}
		Room_status(){
			const obj = new this.$.$mol_audio_status();
			(obj.status) = (next) => ((this?.room_status(next)));
			return obj;
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this?.Sample_url_field()), 
				(this?.Controls()), 
				(this?.Room_status())
			]);
			return obj;
		}
		title(){
			return "WebAudio API sample example";
		}
		Room(){
			const obj = new this.$.$mol_audio_room();
			(obj.input) = () => ([(this?.Sample())]);
			return obj;
		}
		sub(){
			return [(this?.List())];
		}
		tags(){
			return ["sound", "sample"];
		}
		aspects(){
			return ["Media/Audio"];
		}
	};
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Sample"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "sample_url"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Sample_url"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Sample_url_field"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Active_icon"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Active"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "start_click"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Start"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Loop_icon"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Loop"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Controls"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Room_status"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "List"));
	($mol_mem(($.$mol_audio_demo_sample.prototype), "Room"));

//# sourceMappingURL=sample.view.tree.js.map