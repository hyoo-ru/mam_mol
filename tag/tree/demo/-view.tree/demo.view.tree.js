	($.$mol_tag_tree_demo) = class $mol_tag_tree_demo extends ($.$mol_example) {
		title(){
			return "Autoatic tag tree";
		}
		sub(){
			return [(this.Tree())];
		}
		tags(){
			return ["taxonomy", "menu"];
		}
		aspects(){
			return ["Widget/Layout"];
		}
		item_title(id){
			return "";
		}
		Item(id){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.item_title(id)));
			return obj;
		}
		Tree(){
			const obj = new this.$.$mol_tag_tree();
			(obj.Item) = (id) => ((this.Item(id)));
			(obj.levels_expanded) = () => (0);
			(obj.tag_names) = () => ({
				"side": (this.$.$mol_locale.text("$mol_tag_tree_demo_Tree_side")), 
				"good": (this.$.$mol_locale.text("$mol_tag_tree_demo_Tree_good")), 
				"bad": (this.$.$mol_locale.text("$mol_tag_tree_demo_Tree_bad")), 
				"sex": (this.$.$mol_locale.text("$mol_tag_tree_demo_Tree_sex")), 
				"male": (this.$.$mol_locale.text("$mol_tag_tree_demo_Tree_male")), 
				"female": (this.$.$mol_locale.text("$mol_tag_tree_demo_Tree_female")), 
				"universe": (this.$.$mol_locale.text("$mol_tag_tree_demo_Tree_universe")), 
				"marvel": (this.$.$mol_locale.text("$mol_tag_tree_demo_Tree_marvel")), 
				"dc": (this.$.$mol_locale.text("$mol_tag_tree_demo_Tree_dc"))
			});
			(obj.ids_tags) = () => ({
				"batman": [
					"side/good", 
					"universe/dc", 
					"sex/male"
				], 
				"superman": [
					"side/good", 
					"universe/dc", 
					"sex/male"
				], 
				"aquaman": [
					"side/good", 
					"universe/dc", 
					"sex/male"
				], 
				"flash": [
					"side/good", 
					"universe/dc", 
					"sex/male"
				], 
				"jocker": [
					"side/bad", 
					"universe/dc", 
					"sex/male"
				], 
				"deadshot": [
					"side/bad", 
					"universe/dc", 
					"sex/male"
				], 
				"ironman": [
					"side/good", 
					"universe/marvel", 
					"sex/male"
				], 
				"hulk": [
					"side/good", 
					"universe/marvel", 
					"sex/male"
				], 
				"thor": [
					"side/good", 
					"universe/marvel", 
					"sex/male"
				], 
				"spiderman": [
					"side/good", 
					"universe/marvel", 
					"sex/male"
				], 
				"thanos": [
					"side/bad", 
					"universe/marvel", 
					"sex/male"
				], 
				"locky": [
					"side/bad", 
					"universe/marvel", 
					"sex/male"
				], 
				"harley": [
					"side/bad", 
					"universe/dc", 
					"sex/female"
				], 
				"wonderwoman": [
					"side/good", 
					"universe/dc", 
					"sex/female"
				], 
				"hela": [
					"side/bad", 
					"universe/marvel", 
					"sex/female"
				]
			});
			return obj;
		}
	};
	($mol_mem_key(($.$mol_tag_tree_demo.prototype), "Item"));
	($mol_mem(($.$mol_tag_tree_demo.prototype), "Tree"));

//# sourceMappingURL=demo.view.tree.js.map