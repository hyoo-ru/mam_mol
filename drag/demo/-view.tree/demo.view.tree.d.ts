declare namespace $ {

	type $mol_view__sub__CJOB7ZAD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_drop__adopt__ZA7K3UYH = $mol_type_enforce<
		ReturnType< $mol_drag_demo['transfer_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive__SWM46JI2 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['receive_trash'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub__HKWEZIS0 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Trash'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_list__rows__GQQE6RQN = $mol_type_enforce<
		ReturnType< $mol_drag_demo['task_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__head__GPYZ7SOH = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['head'] >
	>
	type $mol_page__Body_content__GRW6TL90 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['List'] >
		,
		ReturnType< $mol_page['Body_content'] >
	>
	type $mol_drop__adopt__2DP9OPML = $mol_type_enforce<
		ReturnType< $mol_drag_demo['transfer_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive__BTVB59K4 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['receive'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub__RDJHWD8F = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Page'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_link__uri__QCC08PGZ = $mol_type_enforce<
		ReturnType< $mol_drag_demo['task_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub__156YWI1C = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_drop__adopt__SLDJRG80 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['transfer_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive__FMJCT8B8 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['receive_before'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub__QYG75MCG = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Task_link'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_drag__transfer__WZ38ND9O = $mol_type_enforce<
		({ 
			'text/plain': ReturnType< $mol_drag_demo['task_title'] >,
			'text/html': ReturnType< $mol_drag_demo['task_html'] >,
			'text/uri-list': ReturnType< $mol_drag_demo['task_uri'] >,
		}) 
		,
		ReturnType< $mol_drag['transfer'] >
	>
	type $mol_drag__Sub__TXGCUH1P = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Task_drop'] >
		,
		ReturnType< $mol_drag['Sub'] >
	>
	export class $mol_drag_demo extends $mol_example_large {
		transfer_adopt( next?: any ): any
		receive( next?: any ): any
		receive_trash( next?: any ): any
		Trash_icon( ): $mol_icon_trash_can_outline
		Trash( ): $mol_view
		Trash_drop( ): $mol_drop
		task_rows( ): readonly(any)[]
		List( ): $mol_list
		Page( ): $mol_page
		List_drop( ): $mol_drop
		task_title( id: any): string
		task_html( id: any): string
		task_uri( id: any): string
		receive_before( id: any, next?: any ): any
		Task_link( id: any): $mol_link
		Task_drop( id: any): $mol_drop
		task_count( ): number
		sub( ): readonly(any)[]
		Task_row( id: any): $mol_drag
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map