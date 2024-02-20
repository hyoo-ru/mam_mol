	($.$mol_row_demo_products) = class $mol_row_demo_products extends ($.$mol_example) {
		product_title(id){
			return "";
		}
		products(){
			return [];
		}
		Products(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ((this.products()));
			return obj;
		}
		title(){
			return "Product catalog";
		}
		count(){
			return 100;
		}
		Product(id){
			const obj = new this.$.$mol_card();
			(obj.minimal_width) = () => (110);
			(obj.minimal_height) = () => (100);
			(obj.title) = () => ((this.product_title(id)));
			return obj;
		}
		sub(){
			return [(this.Products())];
		}
		tags(){
			return [
				"products", 
				"grid", 
				"scroll"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_row_demo_products.prototype), "Products"));
	($mol_mem_key(($.$mol_row_demo_products.prototype), "Product"));

//# sourceMappingURL=products.view.tree.js.map