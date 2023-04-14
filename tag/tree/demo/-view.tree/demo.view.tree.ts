namespace $ {
	export class $mol_tag_tree_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title \Autoatic tag tree
		 * ```
		 */
		title() {
			return "Autoatic tag tree"
		}
		
		/**
		 * ```tree
		 * sub / <= Tree
		 * ```
		 */
		sub() {
			return [
				this.Tree()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\tags
		 * 	\tree
		 * 	\taxonomy
		 * 	\menu
		 * ```
		 */
		tags() {
			return [
				"tags",
				"tree",
				"taxonomy",
				"menu"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Layout
		 * ```
		 */
		aspects() {
			return [
				"Widget/Layout"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * item_title* \
		 * ```
		 */
		item_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Item* $mol_button_minor title <= item_title*
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.item_title(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Tree $mol_tag_tree
		 * 	Item* <= Item*
		 * 	levels_expanded 0
		 * 	tag_names *
		 * 		side @ \Side
		 * 		good @ \Good
		 * 		bad @ \Bad
		 * 		sex @ \Sex
		 * 		male @ \Male
		 * 		female @ \Female
		 * 		universe @ \Universe
		 * 		marvel @ \Marvel
		 * 		dc @ \DC
		 * 	ids_tags *
		 * 		batman /
		 * 			\side/good
		 * 			\universe/dc
		 * 			\sex/male
		 * 		superman /
		 * 			\side/good
		 * 			\universe/dc
		 * 			\sex/male
		 * 		aquaman /
		 * 			\side/good
		 * 			\universe/dc
		 * 			\sex/male
		 * 		flash /
		 * 			\side/good
		 * 			\universe/dc
		 * 			\sex/male
		 * 		jocker /
		 * 			\side/bad
		 * 			\universe/dc
		 * 			\sex/male
		 * 		deadshot /
		 * 			\side/bad
		 * 			\universe/dc
		 * 			\sex/male
		 * 		ironman /
		 * 			\side/good
		 * 			\universe/marvel
		 * 			\sex/male
		 * 		hulk /
		 * 			\side/good
		 * 			\universe/marvel
		 * 			\sex/male
		 * 		thor /
		 * 			\side/good
		 * 			\universe/marvel
		 * 			\sex/male
		 * 		spiderman /
		 * 			\side/good
		 * 			\universe/marvel
		 * 			\sex/male
		 * 		thanos /
		 * 			\side/bad
		 * 			\universe/marvel
		 * 			\sex/male
		 * 		locky /
		 * 			\side/bad
		 * 			\universe/marvel
		 * 			\sex/male
		 * 		harley /
		 * 			\side/bad
		 * 			\universe/dc
		 * 			\sex/female
		 * 		wonderwoman /
		 * 			\side/good
		 * 			\universe/dc
		 * 			\sex/female
		 * 		hela /
		 * 			\side/bad
		 * 			\universe/marvel
		 * 			\sex/female
		 * ```
		 */
		@ $mol_mem
		Tree() {
			const obj = new this.$.$mol_tag_tree()
			
			obj.Item = (id: any) => this.Item(id)
			obj.levels_expanded = () => 0
			obj.tag_names = () => ({
				side: this.$.$mol_locale.text( '$mol_tag_tree_demo_Tree_tag_names_side' ),
				good: this.$.$mol_locale.text( '$mol_tag_tree_demo_Tree_tag_names_good' ),
				bad: this.$.$mol_locale.text( '$mol_tag_tree_demo_Tree_tag_names_bad' ),
				sex: this.$.$mol_locale.text( '$mol_tag_tree_demo_Tree_tag_names_sex' ),
				male: this.$.$mol_locale.text( '$mol_tag_tree_demo_Tree_tag_names_male' ),
				female: this.$.$mol_locale.text( '$mol_tag_tree_demo_Tree_tag_names_female' ),
				universe: this.$.$mol_locale.text( '$mol_tag_tree_demo_Tree_tag_names_universe' ),
				marvel: this.$.$mol_locale.text( '$mol_tag_tree_demo_Tree_tag_names_marvel' ),
				dc: this.$.$mol_locale.text( '$mol_tag_tree_demo_Tree_tag_names_dc' )
			} as Record< string, any >)
			obj.ids_tags = () => ({
				batman: [
					"side/good",
					"universe/dc",
					"sex/male"
				] as readonly any[],
				superman: [
					"side/good",
					"universe/dc",
					"sex/male"
				] as readonly any[],
				aquaman: [
					"side/good",
					"universe/dc",
					"sex/male"
				] as readonly any[],
				flash: [
					"side/good",
					"universe/dc",
					"sex/male"
				] as readonly any[],
				jocker: [
					"side/bad",
					"universe/dc",
					"sex/male"
				] as readonly any[],
				deadshot: [
					"side/bad",
					"universe/dc",
					"sex/male"
				] as readonly any[],
				ironman: [
					"side/good",
					"universe/marvel",
					"sex/male"
				] as readonly any[],
				hulk: [
					"side/good",
					"universe/marvel",
					"sex/male"
				] as readonly any[],
				thor: [
					"side/good",
					"universe/marvel",
					"sex/male"
				] as readonly any[],
				spiderman: [
					"side/good",
					"universe/marvel",
					"sex/male"
				] as readonly any[],
				thanos: [
					"side/bad",
					"universe/marvel",
					"sex/male"
				] as readonly any[],
				locky: [
					"side/bad",
					"universe/marvel",
					"sex/male"
				] as readonly any[],
				harley: [
					"side/bad",
					"universe/dc",
					"sex/female"
				] as readonly any[],
				wonderwoman: [
					"side/good",
					"universe/dc",
					"sex/female"
				] as readonly any[],
				hela: [
					"side/bad",
					"universe/marvel",
					"sex/female"
				] as readonly any[]
			} as Record< string, any >)
			
			return obj
		}
	}
	
}

