declare namespace $ {

	type $mol_chip__title_mol_emoji_safe_demo_1 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['emoji'] >
		,
		ReturnType< $mol_chip['title'] >
	>
	type $mol_view__sub_mol_emoji_safe_demo_2 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['emojis'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_section__title_mol_emoji_safe_demo_3 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['group_title'] >
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__level_mol_emoji_safe_demo_4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_section['level'] >
	>
	type $mol_section__content_mol_emoji_safe_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_list__rows_mol_emoji_safe_demo_6 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['groups'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_emoji_safe_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_emoji_safe_demo extends $mol_example_large {
		group_title( id: any): string
		emoji( id: any): string
		Emoji( id: any): $mol_chip
		emojis( id: any): readonly(any)[]
		Emojis( id: any): $mol_view
		Group( id: any): $mol_section
		groups( ): readonly(any)[]
		Groups( ): $mol_list
		Scroll( ): $mol_scroll
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map