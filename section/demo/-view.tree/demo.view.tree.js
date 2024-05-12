	($.$mol_section_demo) = class $mol_section_demo extends ($.$mol_example_small) {
		Section_content(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Section(){
			const obj = new this.$.$mol_section();
			(obj.title) = () => ("Section header");
			(obj.content) = () => ([(this?.Section_content())]);
			return obj;
		}
		title(){
			return "Section with header";
		}
		sub(){
			return [(this?.Section())];
		}
		tags(){
			return ["container", "header"];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_section_demo.prototype), "Section_content"));
	($mol_mem(($.$mol_section_demo.prototype), "Section"));

//# sourceMappingURL=demo.view.tree.js.map