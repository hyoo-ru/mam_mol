	($.$mol_data_optional_demo) = class $mol_data_optional_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Age = $mol_data_optional( $mol_data_integer )\nconst age1 = Age( 18 ) // ✅\nconst age2 = Age( undefined ) // ✅\n\nAge( 'xxx' ) // ❌ xxx is not a number";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"optional", 
				"maybe"
			];
		}
		aspects(){
			return ["Algorithm/Assert"];
		}
	};
	($mol_mem(($.$mol_data_optional_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map