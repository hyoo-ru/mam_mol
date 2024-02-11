	($.$mol_app_quine) = class $mol_app_quine extends ($.$mol_page) {
		title(){
			return (this.$.$mol_locale.text("$mol_app_quine_title"));
		}
		body(){
			return [(this.Text())];
		}
		paths(){
			return [
				"mol/app/quine/quine.view.tree", 
				"mol/app/quine/quine.view.ts", 
				"mol/app/quine/index.html", 
				"mol/app/quine/quine.locale=ru.json"
			];
		}
		content(){
			return "";
		}
		Text(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.content()));
			return obj;
		}
	};
	($mol_mem(($.$mol_app_quine.prototype), "Text"));

//# sourceMappingURL=quine.view.tree.js.map