	($.$mol_drop) = class $mol_drop extends ($.$mol_ghost) {
		enabled(next){
			if(next !== undefined) return next;
			return true;
		}
		event(){
			return {
				"dragenter": (next) => (this.enter(next)), 
				"dragover": (next) => (this.move(next)), 
				"dragleave": (next) => (this.leave(next)), 
				"drop": (next) => (this.drop(next))
			};
		}
		attr(){
			return {"mol_drop_status": (this.status())};
		}
		adopt(next){
			if(next !== undefined) return next;
			return {};
		}
		receive(next){
			if(next !== undefined) return next;
			return null;
		}
		allow(){
			return [
				"copy", 
				"move", 
				"link"
			];
		}
		enter(next){
			if(next !== undefined) return next;
			return null;
		}
		move(next){
			if(next !== undefined) return next;
			return null;
		}
		leave(next){
			if(next !== undefined) return next;
			return null;
		}
		drop(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return "ready";
		}
	};
	($mol_mem(($.$mol_drop.prototype), "enabled"));
	($mol_mem(($.$mol_drop.prototype), "adopt"));
	($mol_mem(($.$mol_drop.prototype), "receive"));
	($mol_mem(($.$mol_drop.prototype), "enter"));
	($mol_mem(($.$mol_drop.prototype), "move"));
	($mol_mem(($.$mol_drop.prototype), "leave"));
	($mol_mem(($.$mol_drop.prototype), "drop"));
	($mol_mem(($.$mol_drop.prototype), "status"));

//# sourceMappingURL=drop.view.tree.js.map