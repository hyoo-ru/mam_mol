	($.$mol_audio_demo_sequencer) = class $mol_audio_demo_sequencer extends ($.$mol_example_small) {
		room_status(next){
			return (this?.Room()?.status(next));
		}
		room_active(next){
			return (this?.Room()?.active(next));
		}
		beep_track_start(){
			return (this?.Beep_track()?.start());
		}
		beep_track_active(next){
			return (this?.Beep_track()?.active(next));
		}
		notes(next){
			if(next !== undefined) return next;
			return "e e e _ e e e _ e g c d e _ _ _/2 f f f f f e e e e/2 e/2 d d e d _ g _";
		}
		note_length(next){
			if(next !== undefined) return next;
			return .25;
		}
		note_off_part(next){
			if(next !== undefined) return next;
			return .4;
		}
		Beep_track(){
			const obj = new this.$.$mol_audio_melody();
			(obj.notes) = (next) => ((this?.notes(next)));
			(obj.note_length) = (next) => ((this?.note_length(next)));
			(obj.note_off_part) = (next) => ((this?.note_off_part(next)));
			return obj;
		}
		Note_length(){
			const obj = new this.$.$mol_number();
			(obj.precision) = () => (.05);
			(obj.value_min) = () => (.05);
			(obj.value) = (next) => ((this?.note_length(next)));
			return obj;
		}
		Note_length_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Note length, sec");
			(obj.control) = () => ((this?.Note_length()));
			return obj;
		}
		Note_off_part(){
			const obj = new this.$.$mol_number();
			(obj.precision) = () => (.1);
			(obj.value_min) = () => (.1);
			(obj.value) = (next) => ((this?.note_off_part(next)));
			return obj;
		}
		Note_off_part_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Note off, part of length");
			(obj.control) = () => ((this?.Note_off_part()));
			return obj;
		}
		Note_settings(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this?.Note_length_field()), (this?.Note_off_part_field())]);
			return obj;
		}
		Notes(){
			const obj = new this.$.$mol_textarea();
			(obj.hint) = () => ("Example: e _ c#5/2 _/2");
			(obj.value) = (next) => ((this?.notes(next)));
			return obj;
		}
		Notes_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Notes");
			(obj.control) = () => ((this?.Notes()));
			return obj;
		}
		Beep_active_icon(){
			const obj = new this.$.$mol_icon_play_pause();
			return obj;
		}
		Beep_active(){
			const obj = new this.$.$mol_check_icon();
			(obj.hint) = () => ("Play / Pause");
			(obj.Icon) = () => ((this?.Beep_active_icon()));
			(obj.checked) = (next) => ((this?.beep_track_active(next)));
			return obj;
		}
		Beep_play(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this?.beep_track_start(next)));
			(obj.title) = () => ("Play");
			return obj;
		}
		Beep_status(){
			const obj = new this.$.$mol_audio_status();
			(obj.status) = (next) => ((this?.room_status(next)));
			return obj;
		}
		Beep_row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this?.Beep_active()), 
				(this?.Beep_play()), 
				(this?.Beep_status())
			]);
			return obj;
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this?.Note_settings()), 
				(this?.Notes_field()), 
				(this?.Beep_row())
			]);
			return obj;
		}
		title(){
			return "WebAudio API example sequencer";
		}
		Room(){
			const obj = new this.$.$mol_audio_room();
			(obj.input) = () => ([(this?.Beep_track())]);
			return obj;
		}
		sub(){
			return [(this?.List())];
		}
		tags(){
			return ["sound", "sequencer"];
		}
		aspects(){
			return ["Media/Audio"];
		}
	};
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "notes"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "note_length"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "note_off_part"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Beep_track"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Note_length"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Note_length_field"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Note_off_part"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Note_off_part_field"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Note_settings"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Notes"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Notes_field"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Beep_active_icon"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Beep_active"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Beep_play"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Beep_status"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Beep_row"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "List"));
	($mol_mem(($.$mol_audio_demo_sequencer.prototype), "Room"));

//# sourceMappingURL=sequencer.view.tree.js.map