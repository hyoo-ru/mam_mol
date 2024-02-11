	($.$mol_svg_path) = class $mol_svg_path extends ($.$mol_svg) {
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.geometry())};
		}
		geometry(){
			return "";
		}
	};

//# sourceMappingURL=path.view.tree.js.map