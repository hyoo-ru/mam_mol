	($.$mol_text_code_demo) = class $mol_text_code_demo extends ($.$mol_example_small) {
		source(){
			return "";
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		Text(){
			const obj = new this.$.$mol_text_code();
			(obj.sidebar_showed) = () => (true);
			(obj.text) = () => ((this?.source()));
			(obj.syntax) = () => ((this?.syntax()));
			(obj.uri_resolve) = (id) => ((this?.uri_resolve(id)));
			return obj;
		}
		title(){
			return "Markdow visualization example";
		}
		sub(){
			return [(this?.Text())];
		}
		tags(){
			return [
				"text", 
				"code", 
				"syntax highlighting"
			];
		}
		aspects(){
			return ["Widget/Text", "Type/String"];
		}
	};
	($mol_mem(($.$mol_text_code_demo.prototype), "Text"));

//# sourceMappingURL=demo.view.tree.js.map