	($.$mol_data_email_demo) = class $mol_data_email_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const From = $mol_data_email\nconst from = From( 'jin@example.org' ) // ✅\n\nFrom( 'jin' ) // ❌ jin is not a /.+@.+/";
		}
		tags(){
			return ["runtime", "validation"];
		}
		aspects(){
			return ["Algorithm/Assert", "Type/Email"];
		}
	};
	($mol_mem(($.$mol_data_email_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map