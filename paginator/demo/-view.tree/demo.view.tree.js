	($.$mol_paginator_demo) = class $mol_paginator_demo extends ($.$mol_example_small) {
		page(next){
			if(next !== undefined) return next;
			return 0;
		}
		Pages(){
			const obj = new this.$.$mol_paginator();
			(obj.value) = (next) => ((this.page(next)));
			return obj;
		}
		title(){
			return "Page switcher";
		}
		sub(){
			return [(this.Pages())];
		}
		tags(){
			return ["paginator", "navigation"];
		}
		aspects(){
			return ["Widget/Control", "Type/Number/Integer"];
		}
	};
	($mol_mem(($.$mol_paginator_demo.prototype), "page"));
	($mol_mem(($.$mol_paginator_demo.prototype), "Pages"));

//# sourceMappingURL=demo.view.tree.js.map