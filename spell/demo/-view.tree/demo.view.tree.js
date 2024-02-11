	($.$mol_spell_demo) = class $mol_spell_demo extends ($.$mol_example_small) {
		sub(){
			return [(this.List())];
		}
		tags(){
			return [
				"$mol_spell_check", 
				"$mol_textarea", 
				"spellcheck"
			];
		}
		aspects(){
			return ["Algorithm/Validate"];
		}
		article(next){
			if(next !== undefined) return next;
			return "Я весьма сегдян недоперепила, вттак.";
		}
		Article(){
			const obj = new this.$.$mol_textarea();
			(obj.value) = (next) => ((this.article(next)));
			return obj;
		}
		report(){
			return "";
		}
		Report(){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.report()));
			return obj;
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Article()), (this.Report())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_spell_demo.prototype), "article"));
	($mol_mem(($.$mol_spell_demo.prototype), "Article"));
	($mol_mem(($.$mol_spell_demo.prototype), "Report"));
	($mol_mem(($.$mol_spell_demo.prototype), "List"));

//# sourceMappingURL=demo.view.tree.js.map