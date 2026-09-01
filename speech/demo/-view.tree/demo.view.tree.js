	($.$mol_speech_demo) = class $mol_speech_demo extends ($.$mol_example_small) {
		Toggle_icon(){
			const obj = new this.$.$mol_icon_microphone();
			return obj;
		}
		hearing(next){
			if(next !== undefined) return next;
			return false;
		}
		Toggle(){
			const obj = new this.$.$mol_check_icon();
			(obj.Icon) = () => ((this.Toggle_icon()));
			(obj.checked) = (next) => ((this.hearing(next)));
			return obj;
		}
		message(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.message())]);
			return obj;
		}
		speak(next){
			if(next !== undefined) return next;
			return null;
		}
		Speak(){
			const obj = new this.$.$mol_button_major();
			(obj.click) = (next) => ((this.speak(next)));
			(obj.sub) = () => (["Speak"]);
			return obj;
		}
		sub(){
			return [
				(this.Toggle()), 
				(this.Message()), 
				(this.Speak())
			];
		}
		tags(){
			return [
				"speech", 
				"voice", 
				"recognition", 
				"dictation"
			];
		}
		aspects(){
			return ["Widget/Plugin", "Media/Audio"];
		}
	};
	($mol_mem(($.$mol_speech_demo.prototype), "Toggle_icon"));
	($mol_mem(($.$mol_speech_demo.prototype), "hearing"));
	($mol_mem(($.$mol_speech_demo.prototype), "Toggle"));
	($mol_mem(($.$mol_speech_demo.prototype), "Message"));
	($mol_mem(($.$mol_speech_demo.prototype), "speak"));
	($mol_mem(($.$mol_speech_demo.prototype), "Speak"));

//# sourceMappingURL=demo.view.tree.js.map