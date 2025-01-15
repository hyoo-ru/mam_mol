	($.$mol_audio_status) = class $mol_audio_status extends ($.$mol_view) {
		Closed(){
			const obj = new this.$.$mol_icon_power_sleep();
			return obj;
		}
		Error(){
			const obj = new this.$.$mol_icon_alert();
			return obj;
		}
		Suspended(){
			const obj = new this.$.$mol_icon_sleep();
			return obj;
		}
		Playing(){
			const obj = new this.$.$mol_icon_play();
			return obj;
		}
		Running(){
			const obj = new this.$.$mol_icon_pause();
			return obj;
		}
		wakeup(next){
			if(next !== undefined) return next;
			return null;
		}
		wakeup_enabled(){
			return false;
		}
		status_name(){
			return (this.status());
		}
		Icon(){
			const obj = new this.$.$mol_icon_play();
			return obj;
		}
		Wakeup(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.wakeup(next)));
			(obj.enabled) = () => ((this.wakeup_enabled()));
			(obj.hint) = () => ((this.status_name()));
			(obj.sub) = () => ([(this.Icon())]);
			return obj;
		}
		icons(){
			return {
				"closed": (this.Closed()), 
				"error": (this.Error()), 
				"suspended": (this.Suspended()), 
				"playing": (this.Playing()), 
				"running": (this.Running())
			};
		}
		status(next){
			if(next !== undefined) return next;
			return "suspended";
		}
		status_template(){
			return "Audio status: {status}";
		}
		sub(){
			return [(this.Wakeup())];
		}
	};
	($mol_mem(($.$mol_audio_status.prototype), "Closed"));
	($mol_mem(($.$mol_audio_status.prototype), "Error"));
	($mol_mem(($.$mol_audio_status.prototype), "Suspended"));
	($mol_mem(($.$mol_audio_status.prototype), "Playing"));
	($mol_mem(($.$mol_audio_status.prototype), "Running"));
	($mol_mem(($.$mol_audio_status.prototype), "wakeup"));
	($mol_mem(($.$mol_audio_status.prototype), "Icon"));
	($mol_mem(($.$mol_audio_status.prototype), "Wakeup"));
	($mol_mem(($.$mol_audio_status.prototype), "status"));

//# sourceMappingURL=status.view.tree.js.map