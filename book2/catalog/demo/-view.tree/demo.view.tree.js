	($.$mol_book2_catalog_demo) = class $mol_book2_catalog_demo extends ($.$mol_example_large) {
		Spread_close(){
			return (this?.Calatog()?.Spread_close());
		}
		Foods_spread_close(){
			return (this?.Foods()?.Spread_close());
		}
		Pizza(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🍕 Pizzas");
			(obj.tools) = () => ([(this?.Foods_spread_close())]);
			(obj.body) = () => ([(this?.Empty())]);
			return obj;
		}
		Hot_dogs(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🌭 Hot Dogs");
			(obj.tools) = () => ([(this?.Foods_spread_close())]);
			(obj.body) = () => ([(this?.Empty())]);
			return obj;
		}
		Fries(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🍟 Fries");
			(obj.tools) = () => ([(this?.Foods_spread_close())]);
			(obj.body) = () => ([(this?.Empty())]);
			return obj;
		}
		Foods(){
			const obj = new this.$.$mol_book2_catalog();
			(obj.param) = () => ("mol_book2_catalog_demo_foods");
			(obj.menu_title) = () => ("Foods");
			(obj.menu_tools) = () => ([(this?.Spread_close())]);
			(obj.spreads) = () => ({
				"pizza": (this?.Pizza()), 
				"hot_dogs": (this?.Hot_dogs()), 
				"fries": (this?.Fries())
			});
			return obj;
		}
		Animals_spread_close(){
			return (this?.Animals()?.Spread_close());
		}
		Cats(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🐱 Cats");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Dogs(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🐶 Dogs");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Horses(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🐴 Horses");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Racoons(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🦝 Racoons");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Pigs(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🐷 Pigs ");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Rabbits(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🐰 Rabbits");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Wolfs(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🐺 Wolfs");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Mice(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🐭 Mice");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Ants(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🐜 Ants");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Bugs(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🐛 Bugs");
			(obj.tools) = () => ([(this?.Animals_spread_close())]);
			(obj.body) = () => ([(this?.Content())]);
			return obj;
		}
		Animals(){
			const obj = new this.$.$mol_book2_catalog();
			(obj.param) = () => ("mol_book2_catalog_demo_animals");
			(obj.menu_title) = () => ("Animals");
			(obj.menu_tools) = () => ([(this?.Spread_close())]);
			(obj.spreads) = () => ({
				"cats": (this?.Cats()), 
				"dogs": (this?.Dogs()), 
				"horses": (this?.Horses()), 
				"racoons": (this?.Racoons()), 
				"pigs": (this?.Pigs()), 
				"rabbits": (this?.Rabbits()), 
				"wolfs": (this?.Wolfs()), 
				"mice": (this?.Mice()), 
				"ants": (this?.Ants()), 
				"bugs": (this?.Bugs())
			});
			return obj;
		}
		Calatog(){
			const obj = new this.$.$mol_book2_catalog();
			(obj.param) = () => ("mol_book2_catalog_demo");
			(obj.menu_title) = () => ("Catalog");
			(obj.spreads) = () => ({"foods": (this?.Foods()), "animals": (this?.Animals())});
			return obj;
		}
		title(){
			return "Catalog of pages";
		}
		Content(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_status();
			return obj;
		}
		sub(){
			return [(this?.Calatog())];
		}
		tags(){
			return [
				"app", 
				"page", 
				"menu", 
				"navigation", 
				"transition", 
				"multipage"
			];
		}
		aspects(){
			return ["Navigation", "Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Pizza"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Hot_dogs"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Fries"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Foods"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Cats"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Dogs"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Horses"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Racoons"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Pigs"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Rabbits"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Wolfs"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Mice"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Ants"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Bugs"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Animals"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Calatog"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Content"));
	($mol_mem(($.$mol_book2_catalog_demo.prototype), "Empty"));

//# sourceMappingURL=demo.view.tree.js.map