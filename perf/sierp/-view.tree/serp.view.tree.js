	($.$mol_perf_sierp) = class $mol_perf_sierp extends ($.$mol_view) {
		transform(){
			return "";
		}
		dots(){
			return [];
		}
		Dots(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.dots()));
			return obj;
		}
		left(id){
			return 0;
		}
		top(id){
			return 0;
		}
		size(id){
			return 25;
		}
		text(){
			return "";
		}
		size_target(){
			return 25;
		}
		elapsed(next){
			if(next !== undefined) return next;
			return 0;
		}
		style(){
			return {"transform": (this.transform())};
		}
		sub(){
			return [(this.Dots())];
		}
		Dot(id){
			const obj = new this.$.$mol_perf_sierp_dot();
			(obj.left) = () => ((this.left(id)));
			(obj.top) = () => ((this.top(id)));
			(obj.size) = () => ((this.size(id)));
			(obj.text) = () => ((this.text()));
			return obj;
		}
	};
	($mol_mem(($.$mol_perf_sierp.prototype), "Dots"));
	($mol_mem(($.$mol_perf_sierp.prototype), "elapsed"));
	($mol_mem_key(($.$mol_perf_sierp.prototype), "Dot"));
	($.$mol_perf_sierp_dot) = class $mol_perf_sierp_dot extends ($.$mol_view) {
		text(){
			return "";
		}
		width(){
			return (this.size());
		}
		height(){
			return (this.size());
		}
		left(){
			return 0;
		}
		top(){
			return 0;
		}
		radius(){
			return (this.size());
		}
		color(){
			return "";
		}
		enter(next){
			if(next !== undefined) return next;
			return null;
		}
		leave(next){
			if(next !== undefined) return next;
			return null;
		}
		size(){
			return 25;
		}
		size_px(){
			return "25px";
		}
		hover(next){
			if(next !== undefined) return next;
			return false;
		}
		sub(){
			return [(this.text())];
		}
		style(){
			return {
				"width": (this.width()), 
				"height": (this.height()), 
				"left": (this.left()), 
				"top": (this.top()), 
				"borderRadius": (this.radius()), 
				"lineHeight": (this.size_px()), 
				"background": (this.color())
			};
		}
		event(){
			return {
				...(super.event()), 
				"mouseenter": (next) => (this.enter(next)), 
				"mouseleave": (next) => (this.leave(next))
			};
		}
	};
	($mol_mem(($.$mol_perf_sierp_dot.prototype), "enter"));
	($mol_mem(($.$mol_perf_sierp_dot.prototype), "leave"));
	($mol_mem(($.$mol_perf_sierp_dot.prototype), "hover"));

//# sourceMappingURL=serp.view.tree.js.map