	($.$mol_data_record_demo) = class $mol_data_record_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Person = $mol_data_record({\n\tname: $mol_data_string,\n\tage: $mol_data_integer,\n})\nconst person = Person({ name: 'jin', age: 100 }) // ✅\n\nPerson({ name: 'jin' }) // ❌ [\"age\"] undefined is not a number";
		}
		tags(){
			return ["runtime", "validation"];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/Record"];
		}
	};
	($mol_mem(($.$mol_data_record_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map