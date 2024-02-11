	($.$mol_page_demo) = class $mol_page_demo extends ($.$mol_example_large) {
		title(){
			return "Page with header, body and footer";
		}
		sub(){
			return [(this.Page())];
		}
		tags(){
			return [
				"container", 
				"header", 
				"footer", 
				"toolbar", 
				"app", 
				"bar", 
				"bottom", 
				"navigator"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
		Button_tools(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Toolbar Button");
			return obj;
		}
		Text(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Button_foot(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Footer Button");
			return obj;
		}
		Page(){
			const obj = new this.$.$mol_page();
			(obj.tools) = () => ([(this.Button_tools())]);
			(obj.body) = () => ([(this.Text())]);
			(obj.foot) = () => ([(this.Button_foot())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_page_demo.prototype), "Button_tools"));
	($mol_mem(($.$mol_page_demo.prototype), "Text"));
	($mol_mem(($.$mol_page_demo.prototype), "Button_foot"));
	($mol_mem(($.$mol_page_demo.prototype), "Page"));

//# sourceMappingURL=demo.view.tree.js.map