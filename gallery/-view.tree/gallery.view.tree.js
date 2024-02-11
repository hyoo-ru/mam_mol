	($.$mol_gallery) = class $mol_gallery extends ($.$mol_view) {
		sub(){
			return (this.items());
		}
		Side(id){
			const obj = new this.$.$mol_gallery();
			(obj.style) = () => ({"flexGrow": (this.side_size(id))});
			(obj.items) = () => ((this.side_items(id)));
			return obj;
		}
		items(){
			return [];
		}
		side_size(id){
			return "1";
		}
		side_items(id){
			return [];
		}
	};
	($mol_mem_key(($.$mol_gallery.prototype), "Side"));

//# sourceMappingURL=gallery.view.tree.js.map