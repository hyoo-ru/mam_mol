	($.$mol_data_variant_demo) = class $mol_data_variant_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Phone = $mol_data_variant(\n\t$mol_data_number,\n\t$mol_data_string,\n)\nconst phone1 = Phone( 1234567890 ) // ✅\nconst phone2 = Phone( '+1(23)456-78-90' ) // ✅\n\nPhone( null )\n// ❌ null is not any of variants\n// ❌ null is not a number\n// ❌ null is not a string";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"variant", 
				"adt"
			];
		}
		aspects(){
			return ["Algorithm/Assert"];
		}
	};
	($mol_mem(($.$mol_data_variant_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map