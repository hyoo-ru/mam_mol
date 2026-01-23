declare namespace $ {

	type $mol_button_copy__title_mol_emoji_safe_demo_1 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['group_title'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__text_mol_emoji_safe_demo_2 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['group_emoji_text'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	type $mol_button_copy__Icon_mol_emoji_safe_demo_3 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_button_copy['Icon'] >
	>
	type $mol_button_copy__hint_mol_emoji_safe_demo_4 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['emoji_hint'] >
		,
		ReturnType< $mol_button_copy['hint'] >
	>
	type $mol_button_copy__title_mol_emoji_safe_demo_5 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['emoji'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__Icon_mol_emoji_safe_demo_6 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_button_copy['Icon'] >
	>
	type $mol_view__sub_mol_emoji_safe_demo_7 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['emojis'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_section__Title_mol_emoji_safe_demo_8 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['Group_title'] >
		,
		ReturnType< $mol_section['Title'] >
	>
	type $mol_section__content_mol_emoji_safe_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_list__rows_mol_emoji_safe_demo_10 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['groups'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_emoji_safe_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_emoji_safe_demo extends $mol_example_large {
		group_title( id: any): string
		group_emoji_text( id: any): string
		Group_title( id: any): $mol_button_copy
		emoji_hint( id: any): string
		emoji( id: any): string
		Emoji( id: any): $mol_button_copy
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