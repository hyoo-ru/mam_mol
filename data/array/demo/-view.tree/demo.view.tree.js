	($.$mol_data_array_demo) = class $mol_data_array_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Samples = $mol_data_array( $mol_data_number )\nconst samples = Samples( [ 1, 2, 3, 4, 5 ] ) // ✅\n\nSamples([ 1, 'foo' ]) // ❌ [1] foo is not a number";
		}
		tags(){
			return ["runtime", "validation"];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/List"];
		}
	};
	($mol_mem(($.$mol_data_array_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map