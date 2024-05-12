	($.$mol_chart_demo_simple) = class $mol_chart_demo_simple extends ($.$mol_example_large) {
		plan_title(){
			return "Plan";
		}
		plan(){
			return [
				10, 
				20, 
				30, 
				40
			];
		}
		Plan(){
			const obj = new this.$.$mol_plot_bar();
			(obj.title) = () => ((this?.plan_title()));
			(obj.series_y) = () => ((this?.plan()));
			return obj;
		}
		fact_title(){
			return "Fact";
		}
		facts(){
			return [
				5, 
				10, 
				30
			];
		}
		Fact_line(){
			const obj = new this.$.$mol_plot_line();
			return obj;
		}
		Fact_dots(){
			const obj = new this.$.$mol_plot_dot();
			return obj;
		}
		Fact(){
			const obj = new this.$.$mol_plot_group();
			(obj.title) = () => ((this?.fact_title()));
			(obj.series_y) = () => ((this?.facts()));
			(obj.graphs) = () => ([(this?.Fact_line()), (this?.Fact_dots())]);
			return obj;
		}
		vert_title(){
			return "pcs";
		}
		Vert_ruler(){
			const obj = new this.$.$mol_plot_ruler_vert();
			(obj.title) = () => ((this?.vert_title()));
			return obj;
		}
		marker_hor_title(){
			return "Months";
		}
		months(){
			return [
				"January", 
				"February", 
				"March", 
				"April"
			];
		}
		Marker_hor(){
			const obj = new this.$.$mol_plot_mark_hor();
			(obj.title) = () => ((this?.marker_hor_title()));
			(obj.labels) = () => ((this?.months()));
			return obj;
		}
		Marker_cross(){
			const obj = new this.$.$mol_plot_mark_cross();
			(obj.labels) = () => ((this?.months()));
			(obj.graphs) = () => ([(this?.Plan()), (this?.Fact_dots())]);
			return obj;
		}
		Chart(){
			const obj = new this.$.$mol_chart();
			(obj.graphs) = () => ([
				(this?.Plan()), 
				(this?.Fact()), 
				(this?.Vert_ruler()), 
				(this?.Marker_hor()), 
				(this?.Marker_cross())
			]);
			return obj;
		}
		title(){
			return "Simple chart with hadcoded series";
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
				"Widget/Draw/Chart/Bar"
			];
		}
	};
	($mol_mem(($.$mol_chart_demo_simple.prototype), "Plan"));
	($mol_mem(($.$mol_chart_demo_simple.prototype), "Fact_line"));
	($mol_mem(($.$mol_chart_demo_simple.prototype), "Fact_dots"));
	($mol_mem(($.$mol_chart_demo_simple.prototype), "Fact"));
	($mol_mem(($.$mol_chart_demo_simple.prototype), "Vert_ruler"));
	($mol_mem(($.$mol_chart_demo_simple.prototype), "Marker_hor"));
	($mol_mem(($.$mol_chart_demo_simple.prototype), "Marker_cross"));
	($mol_mem(($.$mol_chart_demo_simple.prototype), "Chart"));

//# sourceMappingURL=demo.view.tree.js.map