	($.$mol_link_source) = class $mol_link_source extends ($.$mol_link) {
		hint(){
			return (this.$.$mol_locale.text("$mol_link_source_hint"));
		}
		sub(){
			return [(this.Icon())];
		}
		Icon(){
			const obj = new this.$.$mol_icon_script_text();
			return obj;
		}
	};
	($mol_mem(($.$mol_link_source.prototype), "Icon"));

//# sourceMappingURL=source.view.tree.js.map