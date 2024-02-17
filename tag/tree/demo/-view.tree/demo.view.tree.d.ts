declare namespace $ {

	type $mol_button_minor__title__9UJ0SELQ = $mol_type_enforce<
		ReturnType< $mol_tag_tree_demo['item_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_tag_tree__Item__BIRMYC1Q = $mol_type_enforce<
		ReturnType< $mol_tag_tree_demo['Item'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__levels_expanded__MEQ64EQ3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_tag_tree['levels_expanded'] >
	>
	type $mol_tag_tree__tag_names__AW5841Z2 = $mol_type_enforce<
		({ 
			'side': string,
			'good': string,
			'bad': string,
			'sex': string,
			'male': string,
			'female': string,
			'universe': string,
			'marvel': string,
			'dc': string,
		}) 
		,
		ReturnType< $mol_tag_tree['tag_names'] >
	>
	type $mol_tag_tree__ids_tags__D6QR231E = $mol_type_enforce<
		({ 
			'batman': readonly(any)[],
			'superman': readonly(any)[],
			'aquaman': readonly(any)[],
			'flash': readonly(any)[],
			'jocker': readonly(any)[],
			'deadshot': readonly(any)[],
			'ironman': readonly(any)[],
			'hulk': readonly(any)[],
			'thor': readonly(any)[],
			'spiderman': readonly(any)[],
			'thanos': readonly(any)[],
			'locky': readonly(any)[],
			'harley': readonly(any)[],
			'wonderwoman': readonly(any)[],
			'hela': readonly(any)[],
		}) 
		,
		ReturnType< $mol_tag_tree['ids_tags'] >
	>
	export class $mol_tag_tree_demo extends $mol_example {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		item_title( id: any): string
		Item( id: any): $mol_button_minor
		Tree( ): $mol_tag_tree
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map