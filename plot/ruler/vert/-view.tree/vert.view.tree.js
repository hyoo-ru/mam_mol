	($.$mol_plot_ruler_vert) = class $mol_plot_ruler_vert extends ($.$mol_plot_ruler) {
		title_align(){
			return "end";
		}
		label_align(){
			return "end";
		}
		title_pos_y(){
			return "14";
		}
		label_pos_x(id){
			return (this?.title_pos_x());
		}
		background_height(){
			return "100%";
		}
		background_width(){
			return (this?.title_pos_x());
		}
	};

//# sourceMappingURL=vert.view.tree.js.map