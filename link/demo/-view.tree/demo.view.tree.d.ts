declare namespace $ {

	type $mol_link__sub_mol_link_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_link_demo_2 = $mol_type_enforce<
		({ 
			'color': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_link_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_link_demo_4 = $mol_type_enforce<
		({ 
			'color': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_link_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_link_demo_6 = $mol_type_enforce<
		({ 
			'color': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_link_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__uri_mol_link_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__title_mol_link_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__hint_mol_link_demo_10 = $mol_type_enforce<
		ReturnType< $mol_link_demo['external_hint'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__uri_mol_link_demo_11 = $mol_type_enforce<
		ReturnType< $mol_link_demo['object_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__file_name_mol_link_demo_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['file_name'] >
	>
	type $mol_link__sub_mol_link_demo_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_list__rows_mol_link_demo_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_link_demo extends $mol_example_small {
		this_label( ): string
		This( ): $mol_link
		red_label( ): string
		Red( ): $mol_link
		green_label( ): string
		Green( ): $mol_link
		blue_label( ): string
		Blue( ): $mol_link
		external_hint( ): string
		External( ): $mol_link
		object_uri( ): string
		Download_icon( ): $mol_icon_download
		download_label( ): string
		Download( ): $mol_link
		Demo_items( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map