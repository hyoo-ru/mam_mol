	($.$mol_data_tagged_demo) = class $mol_data_tagged_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const { Weight, Length } = $mol_data_tagged({\n\tWeight: $mol_data_integer,\n\tLength: $mol_data_integer,\n})\n\nlet weight = Weight( 50 ) // ✅\nweight = Length( 50 ) // ❌ Type '\"Weight\"' is not assignable to type '\"Length\"'";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"tagged"
			];
		}
		aspects(){
			return ["Algorithm/Assert"];
		}
	};
	($mol_mem(($.$mol_data_tagged_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map