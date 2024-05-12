	($.$mol_pop) = class $mol_pop extends ($.$mol_view) {
		Anchor(){
			return null;
		}
		align(){
			return "bottom_center";
		}
		bubble_content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		Bubble(){
			const obj = new this.$.$mol_pop_bubble();
			(obj.align) = () => ((this?.align()));
			(obj.content) = () => ((this?.bubble_content()));
			(obj.height_max) = () => ((this?.height_max()));
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		align_vert(){
			return "";
		}
		align_hor(){
			return "";
		}
		prefer(){
			return "vert";
		}
		sub(){
			return [(this?.Anchor())];
		}
		sub_visible(){
			return [(this?.Anchor()), (this?.Bubble())];
		}
	};
	($mol_mem(($.$mol_pop.prototype), "Bubble"));
	($mol_mem(($.$mol_pop.prototype), "showed"));
	($.$mol_pop_bubble) = class $mol_pop_bubble extends ($.$mol_view) {
		content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		align(){
			return "";
		}
		sub(){
			return (this?.content());
		}
		style(){
			return {...(super.style()), "maxHeight": (this?.height_max())};
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_pop_align": (this?.align()), 
				"tabindex": 0
			};
		}
	};

//# sourceMappingURL=pop.view.tree.js.map