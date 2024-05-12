	($.$mol_chart_demo_styles) = class $mol_chart_demo_styles extends ($.$mol_example_large) {
		receipts_title(){
			return "Receipts";
		}
		series_x(){
			return [];
		}
		series_2_y(){
			return [];
		}
		Receipts(){
			const obj = new this.$.$mol_plot_bar();
			(obj.title) = () => ((this?.receipts_title()));
			(obj.series_x) = () => ((this?.series_x()));
			(obj.series_y) = () => ((this?.series_2_y()));
			return obj;
		}
		receipts_confirmed_title(){
			return "Confirmed receipts";
		}
		series_3_y(){
			return [];
		}
		Receipts_confirmed(){
			const obj = new this.$.$mol_plot_bar();
			(obj.title) = () => ((this?.receipts_confirmed_title()));
			(obj.series_x) = () => ((this?.series_x()));
			(obj.series_y) = () => ((this?.series_3_y()));
			return obj;
		}
		maximum_title(){
			return "Maximum";
		}
		series_1_y(){
			return [];
		}
		Maximum(){
			const obj = new this.$.$mol_plot_dot();
			(obj.title) = () => ((this?.maximum_title()));
			(obj.series_x) = () => ((this?.series_x()));
			(obj.series_y) = () => ((this?.series_1_y()));
			return obj;
		}
		waste_title(){
			return "Waste";
		}
		series_4_y(){
			return [];
		}
		Waste(){
			const obj = new this.$.$mol_plot_line();
			(obj.type) = () => ("dashed");
			(obj.title) = () => ((this?.waste_title()));
			(obj.series_x) = () => ((this?.series_x()));
			(obj.series_y) = () => ((this?.series_4_y()));
			return obj;
		}
		purchases_title(){
			return "Purchases";
		}
		series_5_y(){
			return [];
		}
		Purchases_fill(){
			const obj = new this.$.$mol_plot_fill();
			return obj;
		}
		Purchases_line(){
			const obj = new this.$.$mol_plot_line();
			return obj;
		}
		Purchases_dots(){
			const obj = new this.$.$mol_plot_dot();
			return obj;
		}
		Purchases(){
			const obj = new this.$.$mol_plot_group();
			(obj.title) = () => ((this?.purchases_title()));
			(obj.series_x) = () => ((this?.series_x()));
			(obj.series_y) = () => ((this?.series_5_y()));
			(obj.graphs) = () => ([
				(this?.Purchases_fill()), 
				(this?.Purchases_line()), 
				(this?.Purchases_dots())
			]);
			return obj;
		}
		taxes_title(){
			return "Taxes";
		}
		series_6_y(){
			return [];
		}
		Taxes_fill(){
			const obj = new this.$.$mol_plot_fill();
			return obj;
		}
		Taxes_line(){
			const obj = new this.$.$mol_plot_line();
			(obj.type) = () => ("dashed");
			return obj;
		}
		Taxes_dots(){
			const obj = new this.$.$mol_plot_dot();
			return obj;
		}
		Taxes(){
			const obj = new this.$.$mol_plot_group();
			(obj.title) = () => ((this?.taxes_title()));
			(obj.series_x) = () => ((this?.series_x()));
			(obj.series_y) = () => ((this?.series_6_y()));
			(obj.graphs) = () => ([
				(this?.Taxes_fill()), 
				(this?.Taxes_line()), 
				(this?.Taxes_dots())
			]);
			return obj;
		}
		energy_title(){
			return "kJ";
		}
		Energy(){
			const obj = new this.$.$mol_plot_ruler_vert();
			(obj.title) = () => ((this?.energy_title()));
			return obj;
		}
		day_title(){
			return "Day";
		}
		Day(){
			const obj = new this.$.$mol_plot_mark_hor();
			(obj.title) = () => ((this?.day_title()));
			(obj.series_x) = () => ((this?.series_x()));
			return obj;
		}
		graphs(){
			return [
				(this?.Receipts()), 
				(this?.Receipts_confirmed()), 
				(this?.Maximum()), 
				(this?.Waste()), 
				(this?.Purchases()), 
				(this?.Taxes()), 
				(this?.Energy()), 
				(this?.Day())
			];
		}
		Chart(){
			const obj = new this.$.$mol_chart();
			(obj.graphs) = () => ((this?.graphs()));
			return obj;
		}
		title(){
			return "Chart with various styles of graphs.";
		}
		samples_count(){
			return 15;
		}
		sub(){
			return [(this?.Chart())];
		}
		tags(){
			return [
				"plot", 
				"visualization", 
				"dashboard"
			];
		}
		aspects(){
			return [
				"Widget/Draw/Chart/Line", 
				"Widget/Draw/Chart/Dot", 
				"Widget/Draw/Chart/Bar", 
				"Widget/Draw/Chart/Fill"
			];
		}
	};
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Receipts"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Receipts_confirmed"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Maximum"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Waste"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Purchases_fill"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Purchases_line"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Purchases_dots"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Purchases"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Taxes_fill"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Taxes_line"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Taxes_dots"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Taxes"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Energy"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Day"));
	($mol_mem(($.$mol_chart_demo_styles.prototype), "Chart"));

//# sourceMappingURL=demo.view.tree.js.map