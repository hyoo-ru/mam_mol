	($.$mol_speck) = class $mol_speck extends ($.$mol_view) {
		attr(){
			return {...(super.attr()), "mol_theme": (this.theme())};
		}
		style(){
			return {...(super.style()), "minHeight": "1em"};
		}
		sub(){
			return [(this.value())];
		}
		theme(){
			return "$mol_theme_accent";
		}
		value(){
			return null;
		}
	};

//# sourceMappingURL=speck.view.tree.js.map