	($.$mol_hotkey) = class $mol_hotkey extends ($.$mol_plugin) {
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		key(){
			return {};
		}
		mod_ctrl(){
			return false;
		}
		mod_alt(){
			return false;
		}
		mod_shift(){
			return false;
		}
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem(($.$mol_hotkey.prototype), "keydown"));

//# sourceMappingURL=hotkey.view.tree.js.map