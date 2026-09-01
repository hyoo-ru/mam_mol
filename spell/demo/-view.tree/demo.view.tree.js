	($.$mol_spell_demo) = class $mol_spell_demo extends ($.$mol_example_small) {
		article(next){
			if(next !== undefined) return next;
			return "Я весьма сегдян недоперепила, вттак.";
		}
		Article(){
			const obj = new this.$.$mol_textarea();
			(obj.value) = (next) => ((this.article(next)));
			return obj;
		}
		Article_block(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Article");
			(obj.content) = () => ([(this.Article())]);
			return obj;
		}
		segments(){
			return "";
		}
		Segments(){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.segments()));
			return obj;
		}
		Segments_block(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Segments");
			(obj.Content) = () => ((this.Segments()));
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
		Reports_block(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Reports");
			(obj.Content) = () => ((this.Report()));
			return obj;
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Article_block()), 
				(this.Segments_block()), 
				(this.Reports_block())
			]);
			return obj;
		}
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
	};
	($mol_mem(($.$mol_spell_demo.prototype), "article"));
	($mol_mem(($.$mol_spell_demo.prototype), "Article"));
	($mol_mem(($.$mol_spell_demo.prototype), "Article_block"));
	($mol_mem(($.$mol_spell_demo.prototype), "Segments"));
	($mol_mem(($.$mol_spell_demo.prototype), "Segments_block"));
	($mol_mem(($.$mol_spell_demo.prototype), "Report"));
	($mol_mem(($.$mol_spell_demo.prototype), "Reports_block"));
	($mol_mem(($.$mol_spell_demo.prototype), "List"));

//# sourceMappingURL=demo.view.tree.js.map