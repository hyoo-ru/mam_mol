	($.$mol_pick) = class $mol_pick extends ($.$mol_pop) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_enabled(){
			return true;
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_content(){
			return [(this?.title())];
		}
		hint(){
			return "";
		}
		Trigger(){
			const obj = new this.$.$mol_check();
			(obj.minimal_width) = () => (40);
			(obj.minimal_height) = () => (40);
			(obj.enabled) = () => ((this?.trigger_enabled()));
			(obj.checked) = (next) => ((this?.showed(next)));
			(obj.clicks) = (next) => ((this?.clicks(next)));
			(obj.sub) = () => ((this?.trigger_content()));
			(obj.hint) = () => ((this?.hint()));
			return obj;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this?.keydown(next))};
		}
		Anchor(){
			return (this?.Trigger());
		}
	};
	($mol_mem(($.$mol_pick.prototype), "keydown"));
	($mol_mem(($.$mol_pick.prototype), "clicks"));
	($mol_mem(($.$mol_pick.prototype), "Trigger"));

//# sourceMappingURL=pick.view.tree.js.map