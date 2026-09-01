	($.$mol_csv_serial_demo) = class $mol_csv_serial_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const data = [\n\t{ foo: '123', bar: '456' },\n\t{ foo: 'x\"xx', bar: 'y\"y\"y' },\n]\nconst text = $mol_csv_serial( data )";
		}
		tags(){
			return ["table"];
		}
		aspects(){
			return ["Language/CSV", "Language/TSV"];
		}
	};
	($mol_mem(($.$mol_csv_serial_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map