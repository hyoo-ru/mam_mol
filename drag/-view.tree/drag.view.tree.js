	($.$mol_drag) = class $mol_drag extends ($.$mol_ghost) {
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
		draggable(){
			return true;
		}
		status(next){
			if(next !== undefined) return next;
			return "ready";
		}
		plain(){
			return (this.title());
		}
		html(){
			return "";
		}
		uris(){
			return "";
		}
		event(){
			return {
				...(super.event()), 
				"dragstart": (next) => (this.drag_start(next)), 
				"drag": (next) => (this.drag_move(next)), 
				"dragend": (next) => (this.drag_end(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"draggable": (this.draggable()), 
				"mol_drag_status": (this.status())
			};
		}
		transfer(){
			return {
				"text/plain": (this.plain()), 
				"text/html": (this.html()), 
				"text/uri-list": (this.uris())
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
	};
	($mol_mem(($.$mol_drag.prototype), "start"));
	($mol_mem(($.$mol_drag.prototype), "move"));
	($mol_mem(($.$mol_drag.prototype), "end"));
	($mol_mem(($.$mol_drag.prototype), "status"));

//# sourceMappingURL=drag.view.tree.js.map