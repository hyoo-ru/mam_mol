	($.$mol_hotkey2) = class $mol_hotkey2 extends ($.$mol_plugin) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		action(){
			return {};
		}
	};
	($mol_mem(($.$mol_hotkey2.prototype), "keydown"));

//# sourceMappingURL=hotkey2.view.tree.js.map