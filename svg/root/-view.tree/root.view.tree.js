	($.$mol_svg_root) = class $mol_svg_root extends ($.$mol_svg) {
		dom_name(){
			return "svg";
		}
		attr(){
			return {
				...(super.attr()), 
				"viewBox": (this.view_box()), 
				"preserveAspectRatio": (this.aspect())
			};
		}
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid";
		}
	};

//# sourceMappingURL=root.view.tree.js.map