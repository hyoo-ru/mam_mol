	($.$mol_button_share) = class $mol_button_share extends ($.$mol_button_minor) {
		Icon(){
			const obj = new this.$.$mol_icon_share_variant();
			return obj;
		}
		title(){
			return "";
		}
		uri(){
			return "";
		}
		capture(){
			return null;
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_button_share_hint"));
		}
		sub(){
			return [(this?.Icon()), (this?.title())];
		}
	};
	($mol_mem(($.$mol_button_share.prototype), "Icon"));

//# sourceMappingURL=share.view.tree.js.map