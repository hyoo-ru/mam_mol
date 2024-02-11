	($.$mol_format) = class $mol_format extends ($.$mol_string) {
		allow(){
			return "0123456789";
		}
		hint(){
			return (this.mask("0"));
		}
		keyboard(){
			return "numeric";
		}
		mask(id){
			return "";
		}
	};

//# sourceMappingURL=format.view.tree.js.map