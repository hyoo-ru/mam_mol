	($.$mol_transit) = class $mol_transit extends ($.$mol_ghost) {
		animation_name_style(){
			return "";
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		style(){
			return {"animationName": (this.animation_name_style())};
		}
		event(){
			return {"animationend": (next) => (this.reset(next))};
		}
	};
	($mol_mem(($.$mol_transit.prototype), "reset"));

//# sourceMappingURL=transit.view.tree.js.map