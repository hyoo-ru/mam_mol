	($.$mol_frame_demo) = class $mol_frame_demo extends ($.$mol_example_large) {
		Frame(){
			const obj = new this.$.$mol_frame();
			(obj.title) = () => ("Another page inside that");
			(obj.uri) = () => ("https://mol.hyoo.ru/");
			return obj;
		}
		sub(){
			return [(this.Frame())];
		}
		tags(){
			return ["iframe", "container"];
		}
		aspects(){
			return ["Widget/Integration", "Widget/Island"];
		}
	};
	($mol_mem(($.$mol_frame_demo.prototype), "Frame"));

//# sourceMappingURL=demo.view.tree.js.map