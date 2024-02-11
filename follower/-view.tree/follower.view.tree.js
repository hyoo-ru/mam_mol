	($.$mol_follower) = class $mol_follower extends ($.$mol_ghost) {
		Anchor(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		offset(){
			return [0, 0];
		}
		style(){
			return {...(super.style()), "transform": (this.transform())};
		}
		transform(){
			return "";
		}
	};
	($mol_mem(($.$mol_follower.prototype), "Anchor"));

//# sourceMappingURL=follower.view.tree.js.map