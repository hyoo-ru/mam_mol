	($.$mol_search_demo) = class $mol_search_demo extends ($.$mol_example_small) {
		query(){
			return (this.Search().query());
		}
		suggests(){
			return [];
		}
		Search(){
			const obj = new this.$.$mol_search();
			(obj.suggests) = () => ((this.suggests()));
			return obj;
		}
		title(){
			return "Search field with suggest ";
		}
		sub(){
			return [(this.Search())];
		}
		tags(){
			return [
				"search", 
				"suggest", 
				"autocomplete", 
				"string", 
				"fulltext", 
				"filter"
			];
		}
		aspects(){
			return ["Widget/Control", "Type/String"];
		}
	};
	($mol_mem(($.$mol_search_demo.prototype), "Search"));

//# sourceMappingURL=demo.view.tree.js.map