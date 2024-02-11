	($.$mol_text_code_token) = class $mol_text_code_token extends ($.$mol_dimmer) {
		attr(){
			return {...(super.attr()), "mol_text_code_token_type": (this.type())};
		}
		type(){
			return "";
		}
	};
	($.$mol_text_code_token_link) = class $mol_text_code_token_link extends ($.$mol_text_code_token) {
		dom_name(){
			return "a";
		}
		type(){
			return "code-link";
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri()), 
				"target": "_blank"
			};
		}
		uri(){
			return "";
		}
	};

//# sourceMappingURL=token.view.tree.js.map