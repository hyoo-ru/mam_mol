	($.$mol_dimmer_demo) = class $mol_dimmer_demo extends ($.$mol_example_small) {
		One(){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ("Don't put all your eggs in one basket");
			(obj.needle) = () => ("eggs");
			return obj;
		}
		Two(){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ("Don't look a gift horse in the mouth.");
			(obj.needle) = () => ("oo");
			return obj;
		}
		Three(){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ("There is no word you are looking for");
			(obj.needle) = () => ("luck");
			return obj;
		}
		Four(){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ("ooAAooAAoo");
			(obj.needle) = () => ("oo");
			return obj;
		}
		Five(){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ("Let's search this string");
			(obj.needle) = () => ("Let's search this string");
			return obj;
		}
		Six(){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ("Let's search nothing");
			(obj.needle) = () => ("");
			return obj;
		}
		Cases(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this?.One()), 
				(this?.Two()), 
				(this?.Three()), 
				(this?.Four()), 
				(this?.Five()), 
				(this?.Six())
			]);
			return obj;
		}
		title(){
			return "Text with highlighted found substring";
		}
		sub(){
			return [(this?.Cases())];
		}
		tags(){
			return ["search", "highlight"];
		}
		aspects(){
			return ["Widget/Text", "Type/String"];
		}
	};
	($mol_mem(($.$mol_dimmer_demo.prototype), "One"));
	($mol_mem(($.$mol_dimmer_demo.prototype), "Two"));
	($mol_mem(($.$mol_dimmer_demo.prototype), "Three"));
	($mol_mem(($.$mol_dimmer_demo.prototype), "Four"));
	($mol_mem(($.$mol_dimmer_demo.prototype), "Five"));
	($mol_mem(($.$mol_dimmer_demo.prototype), "Six"));
	($mol_mem(($.$mol_dimmer_demo.prototype), "Cases"));

//# sourceMappingURL=demo.view.tree.js.map