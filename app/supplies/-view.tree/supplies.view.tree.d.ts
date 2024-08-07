declare namespace $ {

	type $mol_app_supplies_enter__entered__YD5A2SB6 = $mol_type_enforce<
		ReturnType< $mol_app_supplies['entered'] >
		,
		ReturnType< $mol_app_supplies_enter['entered'] >
	>
	type $mol_app_supplies_list__supplies__M55ADI5V = $mol_type_enforce<
		ReturnType< $mol_app_supplies['supplies'] >
		,
		ReturnType< $mol_app_supplies_list['supplies'] >
	>
	type $mol_app_supplies_list__tools__QZGBKH5J = $mol_type_enforce<
		ReturnType< $mol_app_supplies['tools_root'] >
		,
		ReturnType< $mol_app_supplies_list['tools'] >
	>
	type $mol_app_supplies_list__title__UJ3K6I1N = $mol_type_enforce<
		ReturnType< $mol_app_supplies['list_title'] >
		,
		ReturnType< $mol_app_supplies_list['title'] >
	>
	type $mol_app_supplies_list__search_query__WWE567I4 = $mol_type_enforce<
		ReturnType< $mol_app_supplies['supply_id'] >
		,
		ReturnType< $mol_app_supplies_list['search_query'] >
	>
	type $mol_app_supplies_detail__supply__I4T7RQWW = $mol_type_enforce<
		ReturnType< $mol_app_supplies['supply'] >
		,
		ReturnType< $mol_app_supplies_detail['supply'] >
	>
	export class $mol_app_supplies extends $mol_book2 {
		entered( next?: boolean ): boolean
		supplies( ): readonly($mol_app_supplies_domain_supply)[]
		tools_root( ): readonly(any)[]
		list_title( ): string
		supply_id( next?: string ): string
		supply( ): any
		attr( ): ({ 
			'mol_theme': string,
		})  & ReturnType< $mol_book2['attr'] >
		enter( ): $mol_app_supplies_enter
		List( ): $mol_app_supplies_list
		Detail( id: any): $mol_app_supplies_detail
	}
	
}

//# sourceMappingURL=supplies.view.tree.d.ts.map