	($.$mol_data_number_demo) = class $mol_data_number_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Pos = $mol_data_number\nconst pos = Pos( 1.25 ) // ✅\n\nPos( 'xxx' ) // ❌ xxx is not a number";
		}
		tags(){
			return ["runtime", "validation"];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/Number"];
		}
	};
	($mol_mem(($.$mol_data_number_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map