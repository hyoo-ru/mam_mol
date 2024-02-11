	($.$mol_link_lazy) = class $mol_link_lazy extends ($.$mol_link) {
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
		generate(next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem(($.$mol_link_lazy.prototype), "uri"));
	($mol_mem(($.$mol_link_lazy.prototype), "generate"));

//# sourceMappingURL=lazy.view.tree.js.map