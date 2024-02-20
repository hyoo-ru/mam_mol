	($.$mol_link_lazy) = class $mol_link_lazy extends ($.$mol_link) {
		generate(next){
			if(next !== undefined) return next;
			return null;
		}
		uri(next){
			if(next !== undefined) return next;
			return "";
		}
		uri_generated(){
			return "";
		}
		current(){
			return false;
		}
		event(){
			return {...(super.event()), "mousedown": (next) => (this.generate(next))};
		}
	};
	($mol_mem(($.$mol_link_lazy.prototype), "generate"));
	($mol_mem(($.$mol_link_lazy.prototype), "uri"));

//# sourceMappingURL=lazy.view.tree.js.map