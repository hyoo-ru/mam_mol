	($.$mol_data_instance_demo) = class $mol_data_instance_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Created = $mol_data_instance( Date )\nconst created = Created( new Date ) // ✅\n\nCreated( '2023-01-01' ) // ❌ 2023-01-01 is not a Date";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"instance"
			];
		}
		aspects(){
			return ["Algorithm/Assert"];
		}
	};
	($mol_mem(($.$mol_data_instance_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map