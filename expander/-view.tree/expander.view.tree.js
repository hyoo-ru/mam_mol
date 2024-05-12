	($.$mol_expander) = class $mol_expander extends ($.$mol_list) {
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return true;
		}
		label(){
			return [(this?.title())];
		}
		Trigger(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this?.expanded(next)));
			(obj.expandable) = () => ((this?.expandable()));
			(obj.label) = () => ((this?.label()));
			return obj;
		}
		Tools(){
			return null;
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this?.Trigger()), (this?.Tools())]);
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this?.content()));
			return obj;
		}
		rows(){
			return [(this?.Label()), (this?.Content())];
		}
	};
	($mol_mem(($.$mol_expander.prototype), "expanded"));
	($mol_mem(($.$mol_expander.prototype), "Trigger"));
	($mol_mem(($.$mol_expander.prototype), "Label"));
	($mol_mem(($.$mol_expander.prototype), "Content"));

//# sourceMappingURL=expander.view.tree.js.map