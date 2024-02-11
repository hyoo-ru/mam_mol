	($.$mol_chart_demo_forces) = class $mol_chart_demo_forces extends ($.$mol_example_large) {
		title(){
			return "Fake wheel forces";
		}
		samples_count(){
			return 5000;
		}
		points_max(){
			return 2500;
		}
		sub(){
			return [(this.Chart())];
		}
		tags(){
			return [
				"plot", 
				"visualization", 
				"dashboard"
			];
		}
		aspects(){
			return ["Widget/Draw/Chart/Line", "Widget/Draw/Chart/Dot"];
		}
		forces_left_title(){
			return "Left wheel";
		}
		forces_left_x(){
			return [];
		}
		forces_left_y(){
			return [];
		}
		Forces_left(){
			const obj = new this.$.$mol_plot_dot();
			(obj.title) = () => ((this.forces_left_title()));
			(obj.series_x) = () => ((this.forces_left_x()));
			(obj.series_y) = () => ((this.forces_left_y()));
			(obj.points_max) = () => ((this.points_max()));
			return obj;
		}
		forces_right_title(){
			return "Right wheel";
		}
		forces_right_x(){
			return [];
		}
		forces_right_y(){
			return [];
		}
		Forces_right(){
			const obj = new this.$.$mol_plot_dot();
			(obj.title) = () => ((this.forces_right_title()));
			(obj.series_x) = () => ((this.forces_right_x()));
			(obj.series_y) = () => ((this.forces_right_y()));
			(obj.points_max) = () => ((this.points_max()));
			return obj;
		}
		vert_title(){
			return "kN";
		}
		Vert_ruler(){
			const obj = new this.$.$mol_plot_ruler_vert();
			(obj.title) = () => ((this.vert_title()));
			return obj;
		}
		hor_title(){
			return "cm";
		}
		Hor_ruler(){
			const obj = new this.$.$mol_plot_ruler_hor();
			(obj.title) = () => ((this.hor_title()));
			(obj.series_x) = () => ((this.forces_left_x()));
			return obj;
		}
		Cross(){
			const obj = new this.$.$mol_plot_mark_cross();
			(obj.graphs) = () => ([(this.Forces_left()), (this.Forces_right())]);
			return obj;
		}
		Chart(){
			const obj = new this.$.$mol_chart();
			(obj.graphs) = () => ([
				(this.Forces_left()), 
				(this.Forces_right()), 
				(this.Vert_ruler()), 
				(this.Hor_ruler()), 
				(this.Cross())
			]);
			return obj;
		}
	};
	($mol_mem(($.$mol_chart_demo_forces.prototype), "Forces_left"));
	($mol_mem(($.$mol_chart_demo_forces.prototype), "Forces_right"));
	($mol_mem(($.$mol_chart_demo_forces.prototype), "Vert_ruler"));
	($mol_mem(($.$mol_chart_demo_forces.prototype), "Hor_ruler"));
	($mol_mem(($.$mol_chart_demo_forces.prototype), "Cross"));
	($mol_mem(($.$mol_chart_demo_forces.prototype), "Chart"));

//# sourceMappingURL=forces.view.tree.js.map