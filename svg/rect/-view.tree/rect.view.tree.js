	($.$mol_svg_rect) = class $mol_svg_rect extends ($.$mol_svg) {
		width(){
			return "0";
		}
		height(){
			return "0";
		}
		pos_x(){
			return "";
		}
		pos_y(){
			return "";
		}
		dom_name(){
			return "rect";
		}
		pos(){
			return [];
		}
		attr(){
			return {
				...(super.attr()), 
				"width": (this?.width()), 
				"height": (this?.height()), 
				"x": (this?.pos_x()), 
				"y": (this?.pos_y())
			};
		}
	};

//# sourceMappingURL=rect.view.tree.js.map