declare namespace $ {

	type $mol_app_supplies_enter__entered__HI62QUDS = $mol_type_enforce<
		ReturnType< $mol_app_supplies['entered'] >
		,
		ReturnType< $mol_app_supplies_enter['entered'] >
	>
	type $mol_app_supplies_list__supplies__74MZJ0GB = $mol_type_enforce<
		ReturnType< $mol_app_supplies['supplies'] >
		,
		ReturnType< $mol_app_supplies_list['supplies'] >
	>
	type $mol_app_supplies_list__tools__X90OFYVZ = $mol_type_enforce<
		ReturnType< $mol_app_supplies['tools_root'] >
		,
		ReturnType< $mol_app_supplies_list['tools'] >
	>
	type $mol_app_supplies_list__title__KTS1MQSK = $mol_type_enforce<
		ReturnType< $mol_app_supplies['list_title'] >
		,
		ReturnType< $mol_app_supplies_list['title'] >
	>
	type $mol_app_supplies_list__search_query__Y420LCFN = $mol_type_enforce<
		ReturnType< $mol_app_supplies['supply_id'] >
		,
		ReturnType< $mol_app_supplies_list['search_query'] >
	>
	type $mol_app_supplies_detail__supply__RD0KYCSL = $mol_type_enforce<
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