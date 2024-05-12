	($.$mol_lights_toggle) = class $mol_lights_toggle extends ($.$mol_check_icon) {
		Lights_icon(){
			const obj = new this.$.$mol_icon_brightness_6();
			return obj;
		}
		lights(next){
			if(next !== undefined) return next;
			return false;
		}
		Icon(){
			return (this?.Lights_icon());
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_lights_toggle_hint"));
		}
		checked(next){
			return (this?.lights(next));
		}
	};
	($mol_mem(($.$mol_lights_toggle.prototype), "Lights_icon"));
	($mol_mem(($.$mol_lights_toggle.prototype), "lights"));

//# sourceMappingURL=toggle.view.tree.js.map