	($.$mol_textarea_demo) = class $mol_textarea_demo extends ($.$mol_example) {
		filled_descr(next){
			if(next !== undefined) return next;
			return "function hello( name = 'World' ) {\n\treturn `Hello, ${ name }!`\n}";
		}
		Filled_descr(){
			const obj = new this.$.$mol_textarea();
			(obj.sidebar_showed) = () => (true);
			(obj.hint) = () => ("source code");
			(obj.value) = (next) => ((this.filled_descr(next)));
			return obj;
		}
		symbols_hint(){
			return "";
		}
		Disabled(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.symbols_hint()));
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Filled_descr()), (this.Disabled())]);
			return obj;
		}
		title(){
			return "Text input field in various states";
		}
		sub(){
			return [(this.Content())];
		}
		tags(){
			return [
				"code", 
				"syntax", 
				"highlight"
			];
		}
		aspects(){
			return ["Widget/Control", "Type/String"];
		}
	};
	($mol_mem(($.$mol_textarea_demo.prototype), "filled_descr"));
	($mol_mem(($.$mol_textarea_demo.prototype), "Filled_descr"));
	($mol_mem(($.$mol_textarea_demo.prototype), "Disabled"));
	($mol_mem(($.$mol_textarea_demo.prototype), "Content"));

//# sourceMappingURL=demo.view.tree.js.map