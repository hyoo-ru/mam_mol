	($.$mol_dump_demo) = class $mol_dump_demo extends ($.$mol_example_small) {
		value(){
			return null;
		}
		Dump_short(){
			const obj = new this.$.$mol_dump_value();
			(obj.value) = () => ((this?.value()));
			return obj;
		}
		Dump_long(){
			const obj = new this.$.$mol_dump_value();
			(obj.value) = () => ((this?.value()));
			(obj.prototypes) = () => (true);
			return obj;
		}
		Dump_list(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this?.Dump_short()), (this?.Dump_long())]);
			return obj;
		}
		title(){
			return "Attach files an show them";
		}
		sub(){
			return [(this?.Dump_list())];
		}
		tags(){
			return [
				"dump", 
				"json", 
				"javascript", 
				"debug"
			];
		}
		aspects(){
			return ["Widget"];
		}
	};
	($mol_mem(($.$mol_dump_demo.prototype), "Dump_short"));
	($mol_mem(($.$mol_dump_demo.prototype), "Dump_long"));
	($mol_mem(($.$mol_dump_demo.prototype), "Dump_list"));

//# sourceMappingURL=demo.view.tree.js.map