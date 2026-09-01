	($.$mol_data_nullable_demo) = class $mol_data_nullable_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Age = $mol_data_nullable( $mol_data_integer )\nconst age1 = Age( 18 ) // ✅\nconst age2 = Age( null ) // ✅\n\nAge( 'xxx' ) // ❌ xxx is not a number";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"nullable"
			];
		}
		aspects(){
			return ["Algorithm/Assert"];
		}
	};
	($mol_mem(($.$mol_data_nullable_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map