	($.$mol_book2_demo) = class $mol_book2_demo extends ($.$mol_example_large) {
		Side(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Side"]);
			return obj;
		}
		First(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["First"]);
			return obj;
		}
		Second(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Second"]);
			return obj;
		}
		Third(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Third"]);
			return obj;
		}
		View(){
			const obj = new this.$.$mol_book2();
			(obj.Placeholder) = () => ((this?.Side()));
			(obj.pages) = () => ([
				(this?.First()), 
				(this?.Second()), 
				(this?.Third())
			]);
			return obj;
		}
		title(){
			return "Adaprive layout for various sizes of screen";
		}
		sub(){
			return [(this?.View())];
		}
		tags(){
			return [
				"app", 
				"page", 
				"navigation", 
				"transition", 
				"multipage", 
				"dialog", 
				"breadcrumbs", 
				"drawer"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_book2_demo.prototype), "Side"));
	($mol_mem(($.$mol_book2_demo.prototype), "First"));
	($mol_mem(($.$mol_book2_demo.prototype), "Second"));
	($mol_mem(($.$mol_book2_demo.prototype), "Third"));
	($mol_mem(($.$mol_book2_demo.prototype), "View"));

//# sourceMappingURL=demo.view.tree.js.map