	($.$mol_dump_list) = class $mol_dump_list extends ($.$mol_view) {
		dump_value(id){
			return null;
		}
		dump_expanded(id, next){
			if(next !== undefined) return next;
			return false;
		}
		prototypes(){
			return false;
		}
		preview_show(){
			return true;
		}
		Dump(id){
			const obj = new this.$.$mol_dump_value();
			(obj.value) = () => ((this?.dump_value(id)));
			(obj.expanded) = (next) => ((this?.dump_expanded(id, next)));
			(obj.prototypes) = () => ((this?.prototypes()));
			(obj.preview_show) = () => ((this?.preview_show()));
			return obj;
		}
		values(){
			return [];
		}
		sub(){
			return [(this?.Dump("0"))];
		}
	};
	($mol_mem_key(($.$mol_dump_list.prototype), "dump_expanded"));
	($mol_mem_key(($.$mol_dump_list.prototype), "Dump"));

//# sourceMappingURL=list.view.tree.js.map