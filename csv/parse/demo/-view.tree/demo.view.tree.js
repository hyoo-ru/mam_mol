	($.$mol_csv_parse_demo) = class $mol_csv_parse_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const text = 'foo,bar\\n\"123\",\"456\"\\n\"x\"\"xx\",\"y\"\"y\"\"y\"'\nconst data = $mol_csv_parse( text )";
		}
		tags(){
			return ["table"];
		}
		aspects(){
			return [
				"Language/CSV", 
				"Language/TSV", 
				"Algorithm/Serial"
			];
		}
	};
	($mol_mem(($.$mol_csv_parse_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map