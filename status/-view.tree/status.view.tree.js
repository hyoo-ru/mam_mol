	($.$mol_status) = class $mol_status extends ($.$mol_view) {
		status(){
			return (this.title());
		}
		minimal_height(){
			return 24;
		}
		minimal_width(){
			return 0;
		}
		sub(){
			return [(this.message())];
		}
		message(){
			return "";
		}
	};

//# sourceMappingURL=status.view.tree.js.map