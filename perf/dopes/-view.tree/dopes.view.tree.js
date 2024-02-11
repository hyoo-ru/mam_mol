	($.$mol_perf_dopes) = class $mol_perf_dopes extends ($.$mol_view) {
		title(){
			return "Dopes";
		}
		sub(){
			return [
				(this.Speed()), 
				(this.Start()), 
				(this.Stop()), 
				(this.Labels())
			];
		}
		Label(id){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"color": (this.label_color(id)), "transform": (this.label_transform(id))});
			(obj.sub) = () => (["Dope"]);
			return obj;
		}
		speed(){
			return "{speed} Dopes/s";
		}
		Speed(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.speed())]);
			return obj;
		}
		start(next){
			if(next !== undefined) return next;
			return null;
		}
		Start(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ("@ Start");
			(obj.click) = (next) => ((this.start(next)));
			return obj;
		}
		stop(next){
			if(next !== undefined) return next;
			return null;
		}
		Stop(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ("@ Stop");
			(obj.click) = (next) => ((this.stop(next)));
			return obj;
		}
		labels(){
			return [];
		}
		Labels(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.labels()));
			return obj;
		}
		label_color(id){
			return "";
		}
		label_transform(id){
			return "";
		}
	};
	($mol_mem_key(($.$mol_perf_dopes.prototype), "Label"));
	($mol_mem(($.$mol_perf_dopes.prototype), "Speed"));
	($mol_mem(($.$mol_perf_dopes.prototype), "start"));
	($mol_mem(($.$mol_perf_dopes.prototype), "Start"));
	($mol_mem(($.$mol_perf_dopes.prototype), "stop"));
	($mol_mem(($.$mol_perf_dopes.prototype), "Stop"));
	($mol_mem(($.$mol_perf_dopes.prototype), "Labels"));

//# sourceMappingURL=dopes.view.tree.js.map