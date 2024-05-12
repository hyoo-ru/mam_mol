	($.$mol_format) = class $mol_format extends ($.$mol_string) {
		mask(id){
			return "";
		}
		allow(){
			return "0123456789";
		}
		hint(){
			return (this?.mask("0"));
		}
		keyboard(){
			return "numeric";
		}
	};

//# sourceMappingURL=format.view.tree.js.map