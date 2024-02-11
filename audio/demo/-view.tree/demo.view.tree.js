	($.$mol_audio_demo) = class $mol_audio_demo extends ($.$mol_example_small) {
		title(){
			return "WebAudio API example";
		}
		Beep(){
			const obj = new this.$.$mol_audio_room();
			(obj.duration) = () => (0.1);
			(obj.input) = () => ([(this.Beep_vibe())]);
			return obj;
		}
		Noise(){
			const obj = new this.$.$mol_audio_room();
			(obj.duration) = () => (1);
			(obj.input) = () => ([(this.Noise_vibe())]);
			return obj;
		}
		sub(){
			return [(this.Beep_play()), (this.Noise_play())];
		}
		tags(){
			return ["sound"];
		}
		aspects(){
			return ["Media/Audio"];
		}
		beep_play(){
			return (this.Beep().play());
		}
		Beep_vibe(){
			const obj = new this.$.$mol_audio_vibe();
			(obj.freq) = () => (440);
			return obj;
		}
		noise_play(){
			return (this.Noise().play());
		}
		noise_freq(){
			return 440;
		}
		Noise_vibe(){
			const obj = new this.$.$mol_audio_vibe();
			(obj.freq) = () => ((this.noise_freq()));
			return obj;
		}
		Beep_play(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = () => ((this.beep_play()));
			(obj.title) = () => ("Beep");
			return obj;
		}
		Noise_play(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = () => ((this.noise_play()));
			(obj.title) = () => ("Noise");
			return obj;
		}
	};
	($mol_mem(($.$mol_audio_demo.prototype), "Beep"));
	($mol_mem(($.$mol_audio_demo.prototype), "Noise"));
	($mol_mem(($.$mol_audio_demo.prototype), "Beep_vibe"));
	($mol_mem(($.$mol_audio_demo.prototype), "Noise_vibe"));
	($mol_mem(($.$mol_audio_demo.prototype), "Beep_play"));
	($mol_mem(($.$mol_audio_demo.prototype), "Noise_play"));

//# sourceMappingURL=demo.view.tree.js.map