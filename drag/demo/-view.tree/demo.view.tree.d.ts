declare namespace $ {

	type $mol_view__sub__YZEO5Y98 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_drop__adopt__JBZ1FVQQ = $mol_type_enforce<
		ReturnType< $mol_drag_demo['transfer_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive__DBD34WB3 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['receive_trash'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub__X61M0KU8 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Trash'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_list__rows__5DX9Z9OZ = $mol_type_enforce<
		ReturnType< $mol_drag_demo['task_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__head__XTTMZ33P = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['head'] >
	>
	type $mol_page__Body_content__MRJBFL5Q = $mol_type_enforce<
		ReturnType< $mol_drag_demo['List'] >
		,
		ReturnType< $mol_page['Body_content'] >
	>
	type $mol_drop__adopt__G2ZWYQEE = $mol_type_enforce<
		ReturnType< $mol_drag_demo['transfer_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive__AJSHO5VX = $mol_type_enforce<
		ReturnType< $mol_drag_demo['receive'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub__R8BHYE00 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Page'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_link__uri__G7UOTUFY = $mol_type_enforce<
		ReturnType< $mol_drag_demo['task_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub__ZQFOVODW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_drop__adopt__D9B0NN1K = $mol_type_enforce<
		ReturnType< $mol_drag_demo['transfer_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive__DX7R6YOG = $mol_type_enforce<
		ReturnType< $mol_drag_demo['receive_before'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub__43BPKOY3 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Task_link'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_drag__transfer__G5TFGW6G = $mol_type_enforce<
		({ 
			'text/plain': ReturnType< $mol_drag_demo['task_title'] >,
			'text/html': ReturnType< $mol_drag_demo['task_html'] >,
			'text/uri-list': ReturnType< $mol_drag_demo['task_uri'] >,
		}) 
		,
		ReturnType< $mol_drag['transfer'] >
	>
	type $mol_drag__Sub__VX1BW1M6 = $mol_type_enforce<
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