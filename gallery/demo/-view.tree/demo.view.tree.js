	($.$mol_gallery_demo) = class $mol_gallery_demo extends ($.$mol_example) {
		items(){
			return [];
		}
		App(){
			const obj = new this.$.$mol_gallery();
			(obj.items) = () => ((this.items()));
			return obj;
		}
		item_title(id){
			return "";
		}
		Item_image(id){
			const obj = new this.$.$mol_avatar();
			(obj.id) = () => ((this.item_title(id)));
			return obj;
		}
		title(){
			return "Gallery of cards";
		}
		count(){
			return 101;
		}
		sub(){
			return [(this.App())];
		}
		Item(id){
			const obj = new this.$.$mol_stack();
			(obj.sub) = () => ([(this.Item_image(id))]);
			return obj;
		}
		tags(){
			return [
				"gallery", 
				"image", 
				"adaptive", 
				"masonry"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_gallery_demo.prototype), "App"));
	($mol_mem_key(($.$mol_gallery_demo.prototype), "Item_image"));
	($mol_mem_key(($.$mol_gallery_demo.prototype), "Item"));

//# sourceMappingURL=demo.view.tree.js.map