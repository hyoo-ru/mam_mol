declare namespace $ {

	type $mol_check_icon__checked_mol_app_demo_detail_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['readme'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__hint_mol_app_demo_detail_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__Icon_mol_app_demo_detail_3 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['readme_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_chat__seed_mol_app_demo_detail_4 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['chat_seed'] >
		,
		ReturnType< $mol_chat['seed'] >
	>
	type $mol_speck__value_mol_app_demo_detail_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_link__hint_mol_app_demo_detail_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['edit_hint'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_app_demo_detail_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__uri_mol_app_demo_detail_8 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['edit_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__hint_mol_app_demo_detail_9 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['close_hint'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_app_demo_detail_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_app_demo_detail_11 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['close_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	export class $mol_app_demo_detail extends $mol_page {
		readme( next?: boolean ): boolean
		readme_icon( ): $mol_icon_information_outline
		Readme( ): $mol_check_icon
		chat_pages( ): ReturnType< ReturnType< $mol_app_demo_detail['Chat'] >['pages'] >
		chat_seed( ): string
		Chat( ): $mol_chat
		edit_hint( ): string
		Edit_speck( ): $mol_speck
		Edit_icon( ): $mol_icon_settings
		edit_uri( ): string
		Edit( ): $mol_link
		close_hint( ): string
		Close_icon( ): $mol_icon_close
		close_arg( ): ({ 
			'demo': any,
		}) 
		Close( ): $mol_link
		Demo( ): $mol_view
		description( ): string
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=detail.view.tree.d.ts.map