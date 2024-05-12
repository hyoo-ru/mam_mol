	($.$mol_locale_demo) = class $mol_locale_demo extends ($.$mol_example_small) {
		All_languages(){
			const obj = new this.$.$mol_locale_select();
			return obj;
		}
		All_languages_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("All languages example");
			(obj.content) = () => ([(this?.All_languages())]);
			return obj;
		}
		List_of_languages(){
			const obj = new this.$.$mol_locale_select();
			(obj.dictionary) = () => ({"ru": "Russian", "en": "English"});
			return obj;
		}
		List_of_languages_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Or you can give user select from your list");
			(obj.content) = () => ([(this?.List_of_languages())]);
			return obj;
		}
		title(){
			return "Example usages of $mol_locale component";
		}
		sub(){
			return [(this?.All_languages_labeler()), (this?.List_of_languages_labeler())];
		}
		tags(){
			return ["language", "l10n"];
		}
		aspects(){
			return ["Widget/Control"];
		}
	};
	($mol_mem(($.$mol_locale_demo.prototype), "All_languages"));
	($mol_mem(($.$mol_locale_demo.prototype), "All_languages_labeler"));
	($mol_mem(($.$mol_locale_demo.prototype), "List_of_languages"));
	($mol_mem(($.$mol_locale_demo.prototype), "List_of_languages_labeler"));

//# sourceMappingURL=demo.view.tree.js.map