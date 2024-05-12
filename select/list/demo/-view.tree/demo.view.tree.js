	($.$mol_select_list_demo) = class $mol_select_list_demo extends ($.$mol_example_small) {
		friends(next){
			if(next !== undefined) return next;
			return [];
		}
		suggestions(){
			return {
				"jocker": "Jocker", 
				"harley": "Harley Quinn", 
				"penguin": "Penguin", 
				"riddler": "Riddler", 
				"bane": "Bane", 
				"freeze": "Mister Freeze", 
				"clay": "Clayface", 
				"mask": "Black Mask"
			};
		}
		Friends(){
			const obj = new this.$.$mol_select_list();
			(obj.value) = (next) => ((this?.friends(next)));
			(obj.dictionary) = () => ((this?.suggestions()));
			return obj;
		}
		Friends_disabled(){
			const obj = new this.$.$mol_select_list();
			(obj.value) = (next) => ((this?.friends(next)));
			(obj.dictionary) = () => ((this?.suggestions()));
			(obj.enabled) = () => (false);
			return obj;
		}
		friends_lazy(next){
			if(next !== undefined) return next;
			return [];
		}
		option_title(id){
			return "";
		}
		filter_pattern(next){
			return (this?.Friends_lazy()?.filter_pattern(next));
		}
		suggestions_lazy(){
			return (this?.suggestions());
		}
		Friends_lazy(){
			const obj = new this.$.$mol_select_list();
			(obj.value) = (next) => ((this?.friends_lazy(next)));
			(obj.option_title) = (id) => ((this?.option_title(id)));
			(obj.pick_enabled) = () => (true);
			(obj.dictionary) = () => ((this?.suggestions_lazy()));
			return obj;
		}
		Demo_items(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this?.Friends()), 
				(this?.Friends_disabled()), 
				(this?.Friends_lazy())
			]);
			return obj;
		}
		title(){
			return "Friends picker";
		}
		sub(){
			return [(this?.Demo_items())];
		}
		tags(){
			return [
				"select", 
				"tags", 
				"multiselect"
			];
		}
		aspects(){
			return ["Widget/Control", "Type/List"];
		}
	};
	($mol_mem(($.$mol_select_list_demo.prototype), "friends"));
	($mol_mem(($.$mol_select_list_demo.prototype), "Friends"));
	($mol_mem(($.$mol_select_list_demo.prototype), "Friends_disabled"));
	($mol_mem(($.$mol_select_list_demo.prototype), "friends_lazy"));
	($mol_mem(($.$mol_select_list_demo.prototype), "Friends_lazy"));
	($mol_mem(($.$mol_select_list_demo.prototype), "Demo_items"));

//# sourceMappingURL=demo.view.tree.js.map