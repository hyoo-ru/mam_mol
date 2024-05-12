	($.$mol_deck_demo) = class $mol_deck_demo extends ($.$mol_example_small) {
		Greeting(){
			const obj = new this.$.$mol_card();
			(obj.title) = () => ("Greeting");
			(obj.content) = () => (["Hello, world!"]);
			return obj;
		}
		Question(){
			const obj = new this.$.$mol_card();
			(obj.title) = () => ("Question");
			(obj.content) = () => (["How are you?"]);
			return obj;
		}
		Answer(){
			const obj = new this.$.$mol_card();
			(obj.title) = () => ("Answer");
			(obj.content) = () => (["The Answer to the Ultimate Question of Life, the Universe, and Everything is 42"]);
			return obj;
		}
		Command(){
			const obj = new this.$.$mol_card();
			(obj.title) = () => ("Command");
			(obj.content) = () => (["Let's do it right!"]);
			return obj;
		}
		Spam_content(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Spam(){
			const obj = new this.$.$mol_card();
			(obj.title) = () => ("Spam");
			(obj.Content) = () => ((this?.Spam_content()));
			return obj;
		}
		Deck(){
			const obj = new this.$.$mol_deck();
			(obj.items) = () => ([
				(this?.Greeting()), 
				(this?.Question()), 
				(this?.Answer()), 
				(this?.Command()), 
				(this?.Spam())
			]);
			return obj;
		}
		title(){
			return "Simple deck with tabbar";
		}
		sub(){
			return [(this?.Deck())];
		}
		tags(){
			return ["tabs", "container"];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_deck_demo.prototype), "Greeting"));
	($mol_mem(($.$mol_deck_demo.prototype), "Question"));
	($mol_mem(($.$mol_deck_demo.prototype), "Answer"));
	($mol_mem(($.$mol_deck_demo.prototype), "Command"));
	($mol_mem(($.$mol_deck_demo.prototype), "Spam_content"));
	($mol_mem(($.$mol_deck_demo.prototype), "Spam"));
	($mol_mem(($.$mol_deck_demo.prototype), "Deck"));

//# sourceMappingURL=demo.view.tree.js.map