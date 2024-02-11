	($.$mol_chat_demo) = class $mol_chat_demo extends ($.$mol_example_small) {
		title(){
			return "Feed of comments for this page";
		}
		sub(){
			return [(this.Chat())];
		}
		tags(){
			return ["communication"];
		}
		aspects(){
			return ["Integration", "Widget/Button"];
		}
		chat_pages(){
			return (this.Chat().pages());
		}
		Chat(){
			const obj = new this.$.$mol_chat();
			(obj.seed) = () => ("mol_chat_demo");
			return obj;
		}
	};
	($mol_mem(($.$mol_chat_demo.prototype), "Chat"));

//# sourceMappingURL=demo.view.tree.js.map