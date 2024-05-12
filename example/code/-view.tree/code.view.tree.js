	($.$mol_example_code) = class $mol_example_code extends ($.$mol_example) {
		code(next){
			if(next !== undefined) return next;
			return "";
		}
		Sandbox(){
			const obj = new this.$.$hyoo_js_eval();
			(obj.Menu_page) = () => (null);
			(obj.Perf) = () => (null);
			(obj.Bookmark) = () => (null);
			(obj.code) = (next) => ((this?.code(next)));
			return obj;
		}
		sub(){
			return [(this?.Sandbox())];
		}
		tags(){
			return [
				"sandbox", 
				"eval", 
				"js", 
				"javascript"
			];
		}
		aspects(){
			return ["Widget/Playground"];
		}
	};
	($mol_mem(($.$mol_example_code.prototype), "code"));
	($mol_mem(($.$mol_example_code.prototype), "Sandbox"));

//# sourceMappingURL=code.view.tree.js.map