	($.$mol_plot_ruler_hor) = class $mol_plot_ruler_hor extends ($.$mol_plot_ruler) {
		title_align(){
			return "start";
		}
		label_align(){
			return "middle";
		}
		title_pos_x(){
			return "0";
		}
		title_pos_y(){
			return "100%";
		}
		label_pos_y(id){
			return (this?.title_pos_y());
		}
		background_width(){
			return "100%";
		}
	};

//# sourceMappingURL=hor.view.tree.js.map