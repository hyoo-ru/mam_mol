	($.$mol_map_yandex_mark) = class $mol_map_yandex_mark extends ($.$mol_object) {
		pos(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		box(){
			const obj = new this.$.$mol_vector_2d((this.box_lat()), (this.box_lon()));
			return obj;
		}
		hint(){
			return "";
		}
		title(){
			return (this.address());
		}
		content(){
			return "";
		}
		object(){
			return null;
		}
		box_lat(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		box_lon(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		address(){
			return "";
		}
	};
	($mol_mem(($.$mol_map_yandex_mark.prototype), "pos"));
	($mol_mem(($.$mol_map_yandex_mark.prototype), "box"));
	($mol_mem(($.$mol_map_yandex_mark.prototype), "box_lat"));
	($mol_mem(($.$mol_map_yandex_mark.prototype), "box_lon"));

//# sourceMappingURL=mark.view.tree.js.map