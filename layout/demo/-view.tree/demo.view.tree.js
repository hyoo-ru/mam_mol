	($.$mol_layout_demo) = class $mol_layout_demo extends ($.$mol_example_large) {
		paint(){
			return null;
		}
		context(){
			return (this.Sample().context());
		}
		width(){
			return (this.Sample().width());
		}
		height(){
			return (this.Sample().height());
		}
		Sample(){
			const obj = new this.$.$mol_canvas();
			(obj.paint) = () => ((this.paint()));
			return obj;
		}
		title(){
			return "Custom flex layout engine";
		}
		sub(){
			return [(this.Sample())];
		}
		aspects(){
			return ["Algorithm/Constraint"];
		}
	};
	($mol_mem(($.$mol_layout_demo.prototype), "Sample"));

//# sourceMappingURL=demo.view.tree.js.map