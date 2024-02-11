	($.$mol_map_yandex) = class $mol_map_yandex extends ($.$mol_view) {
		zoom(next){
			if(next !== undefined) return next;
			return 2;
		}
		center(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		objects(){
			return [];
		}
	};
	($mol_mem(($.$mol_map_yandex.prototype), "zoom"));
	($mol_mem(($.$mol_map_yandex.prototype), "center"));

//# sourceMappingURL=yandex.view.tree.js.map