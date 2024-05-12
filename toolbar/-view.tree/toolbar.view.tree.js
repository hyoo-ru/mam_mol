	($.$mol_toolbar) = class $mol_toolbar extends ($.$mol_view) {
		items(){
			return [];
		}
		Bar(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this?.items()));
			return obj;
		}
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		Expand(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this?.expanded(next)));
			return obj;
		}
		attr(){
			return {...(super.attr()), "mol_toolbar_expanded": (this?.expanded())};
		}
		sub(){
			return [(this?.Bar()), (this?.Expand())];
		}
	};
	($mol_mem(($.$mol_toolbar.prototype), "Bar"));
	($mol_mem(($.$mol_toolbar.prototype), "expanded"));
	($mol_mem(($.$mol_toolbar.prototype), "Expand"));

//# sourceMappingURL=toolbar.view.tree.js.map