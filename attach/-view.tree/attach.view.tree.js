	($.$mol_attach) = class $mol_attach extends ($.$mol_view) {
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ((this?.content()));
			return obj;
		}
		attach_title(){
			return "";
		}
		attach_new(next){
			if(next !== undefined) return next;
			return null;
		}
		item_drop(id, next){
			if(next !== undefined) return next;
			return null;
		}
		item_uri(id){
			return "";
		}
		Image(id){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ("");
			(obj.uri) = () => ((this?.item_uri(id)));
			return obj;
		}
		items(next){
			if(next !== undefined) return next;
			return [];
		}
		sub(){
			return [(this?.Content())];
		}
		Add(){
			const obj = new this.$.$mol_button_open();
			(obj.title) = () => ((this?.attach_title()));
			(obj.files) = (next) => ((this?.attach_new(next)));
			return obj;
		}
		Item(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this?.item_drop(id, next)));
			(obj.sub) = () => ([(this?.Image(id))]);
			return obj;
		}
	};
	($mol_mem(($.$mol_attach.prototype), "Content"));
	($mol_mem(($.$mol_attach.prototype), "attach_new"));
	($mol_mem_key(($.$mol_attach.prototype), "item_drop"));
	($mol_mem_key(($.$mol_attach.prototype), "Image"));
	($mol_mem(($.$mol_attach.prototype), "items"));
	($mol_mem(($.$mol_attach.prototype), "Add"));
	($mol_mem_key(($.$mol_attach.prototype), "Item"));

//# sourceMappingURL=attach.view.tree.js.map