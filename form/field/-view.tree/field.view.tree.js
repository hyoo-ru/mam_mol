	($.$mol_form_field) = class $mol_form_field extends ($.$mol_labeler) {
		name(){
			return "";
		}
		bid(){
			return "";
		}
		Bid(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this?.bid())]);
			return obj;
		}
		control(){
			return null;
		}
		bids(){
			return [];
		}
		label(){
			return [(this?.name()), (this?.Bid())];
		}
		content(){
			return [(this?.control())];
		}
	};
	($mol_mem(($.$mol_form_field.prototype), "Bid"));

//# sourceMappingURL=field.view.tree.js.map