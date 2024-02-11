	($.$mol_portion_indicator) = class $mol_portion_indicator extends ($.$mol_view) {
		style(){
			return {...(super.style()), "width": (this.width_style())};
		}
		width_style(){
			return "0";
		}
	};
	($.$mol_portion) = class $mol_portion extends ($.$mol_view) {
		portion(){
			return 0;
		}
		sub(){
			return [(this.indicator())];
		}
		indicator_width_style(){
			return "0";
		}
		indicator(){
			const obj = new this.$.$mol_portion_indicator();
			(obj.width_style) = () => ((this.indicator_width_style()));
			return obj;
		}
	};
	($mol_mem(($.$mol_portion.prototype), "indicator"));

//# sourceMappingURL=portion.view.tree.js.map