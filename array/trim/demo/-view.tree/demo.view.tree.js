	($.$mol_array_trim_demo) = class $mol_array_trim_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const res = $mol_array_trim([\n\tundefined,\n\tnull,\n\t0,\n\tfalse,\n\tnull,\n\tundefined,\n\tundefined,\n])";
		}
		aspects(){
			return ["Type/List"];
		}
	};
	($mol_mem(($.$mol_array_trim_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map