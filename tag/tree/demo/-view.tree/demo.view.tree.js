	($.$mol_tag_tree_demo) = class $mol_tag_tree_demo extends ($.$mol_example) {
		item_title(id){
			return "";
		}
		Item(id){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this?.item_title(id)));
			return obj;
		}
		Tree(){
			const obj = new this.$.$mol_tag_tree();
			(obj.Item) = (id) => ((this?.Item(id)));
			(obj.levels_expanded) = () => (0);
			(obj.ids_tags) = () => ({
				"Batman": [
					"Side/Good", 
					"Universe/DC", 
					"Sex/Male"
				], 
				"Superman": [
					"Side/Good", 
					"Universe/DC", 
					"Sex/Male"
				], 
				"Aquaman": [
					"Side/Good", 
					"Universe/DC", 
					"Sex/Male"
				], 
				"Flash": [
					"Side/Good", 
					"Universe/DC", 
					"Sex/Male"
				], 
				"Jocker": [
					"Side/Bad", 
					"Universe/DC", 
					"Sex/Male"
				], 
				"Deadshot": [
					"Side/Bad", 
					"Universe/DC", 
					"Sex/Male"
				], 
				"Ironman": [
					"Side/Good", 
					"Universe/Marvel", 
					"Sex/Male"
				], 
				"Hulk": [
					"Side/Good", 
					"Universe/Marvel", 
					"Sex/Male"
				], 
				"Thor": [
					"Side/Good", 
					"Universe/Marvel", 
					"Sex/Male"
				], 
				"Spiderman": [
					"Side/Good", 
					"Universe/Marvel", 
					"Sex/Male"
				], 
				"Thanos": [
					"Side/Bad", 
					"Universe/Marvel", 
					"Sex/Male"
				], 
				"Locky": [
					"Side/Bad", 
					"Universe/Marvel", 
					"Sex/Male"
				], 
				"Harley Quinn": [
					"Side/Bad", 
					"Universe/DC", 
					"Sex/Female"
				], 
				"Wonder Woman": [
					"Side/Good", 
					"Universe/DC", 
					"Sex/Female"
				], 
				"Hela": [
					"Side/Bad", 
					"Universe/Marvel", 
					"Sex/Female"
				]
			});
			return obj;
		}
		title(){
			return "Autoatic tag tree";
		}
		sub(){
			return [(this?.Tree())];
		}
		tags(){
			return ["taxonomy", "menu"];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem_key(($.$mol_tag_tree_demo.prototype), "Item"));
	($mol_mem(($.$mol_tag_tree_demo.prototype), "Tree"));

//# sourceMappingURL=demo.view.tree.js.map