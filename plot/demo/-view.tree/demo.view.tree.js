	($.$mol_plot_demo) = class $mol_plot_demo extends ($.$mol_example_large) {
		title(){
			return "Dynamic lightweight graphs";
		}
		count(next){
			if(next !== undefined) return next;
			return 20;
		}
		frequency(){
			return 8;
		}
		sub(){
			return [(this.Plot())];
		}
		tags(){
			return [
				"visualization", 
				"chart", 
				"graph", 
				"dashboard"
			];
		}
		aspects(){
			return [
				"Widget/Draw/Chart/Line", 
				"Widget/Draw/Chart/Fill", 
				"Widget/Draw/Chart/Dot"
			];
		}
		saturation_series(){
			return [];
		}
		Saturation_fill(){
			const obj = new this.$.$mol_plot_fill();
			return obj;
		}
		Saturation_line(){
			const obj = new this.$.$mol_plot_line();
			(obj.type) = () => ("dashed");
			return obj;
		}
		Saturation(){
			const obj = new this.$.$mol_plot_group();
			(obj.series_y) = () => ((this.saturation_series()));
			(obj.graphs) = () => ([(this.Saturation_fill()), (this.Saturation_line())]);
			return obj;
		}
		input_series(){
			return [];
		}
		Input_line(){
			const obj = new this.$.$mol_plot_line();
			return obj;
		}
		Input_dots(){
			const obj = new this.$.$mol_plot_dot();
			return obj;
		}
		Input(){
			const obj = new this.$.$mol_plot_group();
			(obj.series_y) = () => ((this.input_series()));
			(obj.graphs) = () => ([(this.Input_line()), (this.Input_dots())]);
			return obj;
		}
		output_series(){
			return [];
		}
		Output(){
			const obj = new this.$.$mol_plot_bar();
			(obj.series_y) = () => ((this.output_series()));
			return obj;
		}
		Voltage_title(){
			return "V";
		}
		Voltage(){
			const obj = new this.$.$mol_plot_ruler_vert();
			(obj.title) = () => ((this.Voltage_title()));
			return obj;
		}
		Time_title(){
			return "ms";
		}
		Time(){
			const obj = new this.$.$mol_plot_ruler_hor();
			(obj.title) = () => ((this.Time_title()));
			return obj;
		}
		Plot(){
			const obj = new this.$.$mol_plot_pane();
			(obj.graphs) = () => ([
				(this.Saturation()), 
				(this.Input()), 
				(this.Output()), 
				(this.Voltage()), 
				(this.Time())
			]);
			return obj;
		}
	};
	($mol_mem(($.$mol_plot_demo.prototype), "count"));
	($mol_mem(($.$mol_plot_demo.prototype), "Saturation_fill"));
	($mol_mem(($.$mol_plot_demo.prototype), "Saturation_line"));
	($mol_mem(($.$mol_plot_demo.prototype), "Saturation"));
	($mol_mem(($.$mol_plot_demo.prototype), "Input_line"));
	($mol_mem(($.$mol_plot_demo.prototype), "Input_dots"));
	($mol_mem(($.$mol_plot_demo.prototype), "Input"));
	($mol_mem(($.$mol_plot_demo.prototype), "Output"));
	($mol_mem(($.$mol_plot_demo.prototype), "Voltage"));
	($mol_mem(($.$mol_plot_demo.prototype), "Time"));
	($mol_mem(($.$mol_plot_demo.prototype), "Plot"));

//# sourceMappingURL=demo.view.tree.js.map