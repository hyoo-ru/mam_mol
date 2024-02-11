	($.$mol_perf_uibench_anim) = class $mol_perf_uibench_anim extends ($.$mol_view) {
		state(){
			return null;
		}
		attr_static(){
			return {...(super.attr_static()), "class": "Anim"};
		}
		sub(){
			return (this.boxes());
		}
		Box(id){
			const obj = new this.$.$mol_perf_uibench_anim_box();
			(obj.state) = () => ((this.box_state(id)));
			return obj;
		}
		boxes(){
			return [];
		}
		box_state(id){
			return null;
		}
	};
	($mol_mem_key(($.$mol_perf_uibench_anim.prototype), "Box"));
	($.$mol_perf_uibench_anim_box) = class $mol_perf_uibench_anim_box extends ($.$mol_view) {
		state(){
			return null;
		}
		attr(){
			return {
				...(super.attr()), 
				"class": "AnimBox", 
				"data-id": (this.id())
			};
		}
		style(){
			return {
				...(super.style()), 
				"borderRadius": (this.style_radius()), 
				"background": (this.style_color())
			};
		}
		id(){
			return "";
		}
		style_radius(){
			return "";
		}
		style_color(){
			return "";
		}
	};

//# sourceMappingURL=anim.view.tree.js.map