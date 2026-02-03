	($.$mol_attach) = class $mol_attach extends ($.$mol_view) {
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
			(obj.uri) = () => ((this.item_uri(id)));
			return obj;
		}
		Item(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.item_drop(id, next)));
			(obj.sub) = () => ([(this.Image(id))]);
			return obj;
		}
		attach_title(){
			return "";
		}
		attach_new(next){
			if(next !== undefined) return next;
			return null;
		}
		Add(){
			const obj = new this.$.$mol_button_open();
			(obj.title) = () => ((this.attach_title()));
			(obj.files) = (next) => ((this.attach_new(next)));
			return obj;
		}
		content(){
			return [(this.Item("0")), (this.Add())];
		}
		items(next){
			if(next !== undefined) return next;
			return [];
		}
		sub(){
			return (this.content());
		}
	};
	($mol_mem_key(($.$mol_attach.prototype), "item_drop"));
	($mol_mem_key(($.$mol_attach.prototype), "Image"));
	($mol_mem_key(($.$mol_attach.prototype), "Item"));
	($mol_mem(($.$mol_attach.prototype), "attach_new"));
	($mol_mem(($.$mol_attach.prototype), "Add"));
	($mol_mem(($.$mol_attach.prototype), "items"));

//# sourceMappingURL=attach.view.tree.js.map