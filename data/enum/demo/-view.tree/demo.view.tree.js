	($.$mol_data_enum_demo_number) = class $mol_data_enum_demo_number extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "enum SexValues { male, female }\nconst Sex = $mol_data_enum( 'Sex', SexValues )\nconst sex = Sex( 0 ) // ✅\n\nSamples( 3 ) // ❌ 3 is not value of Sex enum";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"enum"
			];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/Number"];
		}
	};
	($mol_mem(($.$mol_data_enum_demo_number.prototype), "code"));
	($.$mol_data_enum_demo_string) = class $mol_data_enum_demo_string extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "enum SexValues { male = 'male', female = 'female' }\nconst Sex = $mol_data_enum( 'Sex', SexValues )\nconst sex = Sex( 'male' ) // ✅\n\nSamples( 'helicopter' ) // ❌ helicopter is not value of Sex enum";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"enum"
			];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/String"];
		}
	};
	($mol_mem(($.$mol_data_enum_demo_string.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map