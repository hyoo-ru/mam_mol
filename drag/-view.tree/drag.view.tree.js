	($.$mol_drag) = class $mol_drag extends ($.$mol_ghost) {
		event(){
			return {
				"dragstart": (next) => (this.drag_start(next)), 
				"drag": (next) => (this.drag_move(next)), 
				"dragend": (next) => (this.drag_end(next))
			};
		}
		attr(){
			return {"draggable": true, "mol_drag_status": (this.status())};
		}
		transfer(){
			return {
				"text/plain": "", 
				"text/html": "", 
				"text/uri-list": ""
			};
		}
		allow_copy(){
			return true;
		}
		allow_link(){
			return true;
		}
		allow_move(){
			return true;
		}
		image(){
			return (this.dom_node());
		}
		start(next){
			if(next !== undefined) return next;
			return null;
		}
		drag_start(next){
			return (this.start(next));
		}
		move(next){
			if(next !== undefined) return next;
			return null;
		}
		drag_move(next){
			return (this.move(next));
		}
		end(next){
			if(next !== undefined) return next;
			return null;
		}
		drag_end(next){
			return (this.end(next));
		}
		status(next){
			if(next !== undefined) return next;
			return "ready";
		}
	};
	($mol_mem(($.$mol_drag.prototype), "start"));
	($mol_mem(($.$mol_drag.prototype), "move"));
	($mol_mem(($.$mol_drag.prototype), "end"));
	($mol_mem(($.$mol_drag.prototype), "status"));

//# sourceMappingURL=drag.view.tree.js.map