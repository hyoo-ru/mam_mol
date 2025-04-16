	($.$mol_chip) = class $mol_chip extends ($.$mol_view) {
		hint(){
			return "";
		}
		attr(){
			return {...(super.attr()), "title": (this.hint())};
		}
		sub(){
			return [(this.title())];
		}
	};

//# sourceMappingURL=chip.view.tree.js.map