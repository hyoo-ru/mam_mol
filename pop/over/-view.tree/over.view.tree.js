	($.$mol_pop_over) = class $mol_pop_over extends ($.$mol_pop) {
		hovered(next){
			if(next !== undefined) return next;
			return false;
		}
		event_show(next){
			if(next !== undefined) return next;
			return null;
		}
		event_hide(next){
			if(next !== undefined) return next;
			return null;
		}
		showed(){
			return (this?.hovered());
		}
		attr(){
			return {...(super.attr()), "tabindex": 0};
		}
		event(){
			return {
				...(super.event()), 
				"mouseenter": (next) => (this?.event_show(next)), 
				"mouseleave": (next) => (this?.event_hide(next))
			};
		}
	};
	($mol_mem(($.$mol_pop_over.prototype), "hovered"));
	($mol_mem(($.$mol_pop_over.prototype), "event_show"));
	($mol_mem(($.$mol_pop_over.prototype), "event_hide"));

//# sourceMappingURL=over.view.tree.js.map