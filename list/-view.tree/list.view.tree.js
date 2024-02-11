	($.$mol_list) = class $mol_list extends ($.$mol_view) {
		render_visible_only(){
			return true;
		}
		render_over(){
			return 0;
		}
		sub(){
			return (this.rows());
		}
		Empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Gap_before(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_before())});
			return obj;
		}
		Gap_after(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_after())});
			return obj;
		}
		view_window(){
			return [0, 0];
		}
		rows(){
			return [];
		}
		gap_before(){
			return 0;
		}
		gap_after(){
			return 0;
		}
	};
	($mol_mem(($.$mol_list.prototype), "Empty"));
	($mol_mem(($.$mol_list.prototype), "Gap_before"));
	($mol_mem(($.$mol_list.prototype), "Gap_after"));

//# sourceMappingURL=list.view.tree.js.map