	($.$mol_card) = class $mol_card extends ($.$mol_list) {
		status(){
			return "";
		}
		content(){
			return [(this.title())];
		}
		Content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		status_text(){
			return (this.status());
		}
		Status(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (30);
			(obj.sub) = () => ([(this.status_text())]);
			return obj;
		}
		attr(){
			return {...(super.attr()), "mol_card_status_type": (this.status())};
		}
		rows(){
			return [(this.Content()), (this.Status())];
		}
	};
	($mol_mem(($.$mol_card.prototype), "Content"));
	($mol_mem(($.$mol_card.prototype), "Status"));

//# sourceMappingURL=card.view.tree.js.map