	($.$mol_drag_demo) = class $mol_drag_demo extends ($.$mol_example_large) {
		task_count(){
			return 100;
		}
		sub(){
			return [(this.List_drop())];
		}
		Task_row(id){
			const obj = new this.$.$mol_drag();
			(obj.transfer) = () => ({
				"text/plain": (this.task_title(id)), 
				"text/html": (this.task_html(id)), 
				"text/uri-list": (this.task_uri(id))
			});
			(obj.Sub) = () => ((this.Task_drop(id)));
			return obj;
		}
		tags(){
			return [
				"drag", 
				"dragndrop", 
				"reorder", 
				"transfer"
			];
		}
		aspects(){
			return ["Widget/Plugin", "Drag'n'Drop"];
		}
		transfer_adopt(next){
			if(next !== undefined) return next;
			return null;
		}
		receive(next){
			if(next !== undefined) return next;
			return null;
		}
		receive_trash(next){
			if(next !== undefined) return next;
			return null;
		}
		Trash_icon(){
			const obj = new this.$.$mol_icon_trash_can_outline();
			return obj;
		}
		Trash(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Trash_icon()), " Trash"]);
			return obj;
		}
		Trash_drop(){
			const obj = new this.$.$mol_drop();
			(obj.adopt) = (next) => ((this.transfer_adopt(next)));
			(obj.receive) = (next) => ((this.receive_trash(next)));
			(obj.Sub) = () => ((this.Trash()));
			return obj;
		}
		task_rows(){
			return [];
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.task_rows()));
			return obj;
		}
		Page(){
			const obj = new this.$.$mol_page();
			(obj.head) = () => ([(this.Trash_drop())]);
			(obj.Body_content) = () => ((this.List()));
			return obj;
		}
		List_drop(){
			const obj = new this.$.$mol_drop();
			(obj.adopt) = (next) => ((this.transfer_adopt(next)));
			(obj.receive) = (next) => ((this.receive(next)));
			(obj.Sub) = () => ((this.Page()));
			return obj;
		}
		task_title(id){
			return "";
		}
		task_html(id){
			return "";
		}
		task_uri(id){
			return "";
		}
		receive_before(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Task_link(id){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.task_uri(id)));
			(obj.sub) = () => ([(this.task_title(id))]);
			return obj;
		}
		Task_drop(id){
			const obj = new this.$.$mol_drop();
			(obj.adopt) = (next) => ((this.transfer_adopt(next)));
			(obj.receive) = (next) => ((this.receive_before(id, next)));
			(obj.Sub) = () => ((this.Task_link(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_drag_demo.prototype), "Task_row"));
	($mol_mem(($.$mol_drag_demo.prototype), "transfer_adopt"));
	($mol_mem(($.$mol_drag_demo.prototype), "receive"));
	($mol_mem(($.$mol_drag_demo.prototype), "receive_trash"));
	($mol_mem(($.$mol_drag_demo.prototype), "Trash_icon"));
	($mol_mem(($.$mol_drag_demo.prototype), "Trash"));
	($mol_mem(($.$mol_drag_demo.prototype), "Trash_drop"));
	($mol_mem(($.$mol_drag_demo.prototype), "List"));
	($mol_mem(($.$mol_drag_demo.prototype), "Page"));
	($mol_mem(($.$mol_drag_demo.prototype), "List_drop"));
	($mol_mem_key(($.$mol_drag_demo.prototype), "receive_before"));
	($mol_mem_key(($.$mol_drag_demo.prototype), "Task_link"));
	($mol_mem_key(($.$mol_drag_demo.prototype), "Task_drop"));

//# sourceMappingURL=demo.view.tree.js.map