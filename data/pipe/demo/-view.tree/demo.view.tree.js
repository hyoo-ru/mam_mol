	($.$mol_data_pipe_demo) = class $mol_data_pipe_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const Birthday = $mol_data_pipe(\n\t$mol_data_string,\n\t$mol_time_moment,\n\t( moment: $mol_time_moment )=> moment.toOffset( 'Z' ),\n)\nconst birthday = Birthday( '2023-01-06' ) // ✅\n\nBirthday( 123 ) // ❌ 2023-01-06 is not a number";
		}
		tags(){
			return [
				"runtime", 
				"validation", 
				"pipe"
			];
		}
		aspects(){
			return ["Algorithm/Assert", "Algorithm/Compose"];
		}
	};
	($mol_mem(($.$mol_data_pipe_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map