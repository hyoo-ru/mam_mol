	($.$mol_transit_demo) = class $mol_transit_demo extends ($.$mol_example_large) {
		align(next){
			if(next !== undefined) return next;
			return "center";
		}
		Align(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this?.align(next)));
			(obj.options) = () => ({
				"flex-start": "left", 
				"center": "center", 
				"flex-end": "right"
			});
			return obj;
		}
		justify(next){
			if(next !== undefined) return next;
			return "center";
		}
		Justify(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this?.justify(next)));
			(obj.options) = () => ({
				"flex-start": "top", 
				"center": "center", 
				"flex-end": "bottom"
			});
			return obj;
		}
		Float(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this?.Align()), (this?.Justify())]);
			return obj;
		}
		Transit(){
			const obj = new this.$.$mol_transit();
			(obj.Sub) = () => ((this?.Float()));
			return obj;
		}
		title(){
			return "Layout transition";
		}
		style(){
			return {"justify-content": (this?.justify()), "align-items": (this?.align())};
		}
		sub(){
			return [(this?.Transit())];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_transit_demo.prototype), "align"));
	($mol_mem(($.$mol_transit_demo.prototype), "Align"));
	($mol_mem(($.$mol_transit_demo.prototype), "justify"));
	($mol_mem(($.$mol_transit_demo.prototype), "Justify"));
	($mol_mem(($.$mol_transit_demo.prototype), "Float"));
	($mol_mem(($.$mol_transit_demo.prototype), "Transit"));

//# sourceMappingURL=demo.view.tree.js.map