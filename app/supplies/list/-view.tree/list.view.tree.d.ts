declare namespace $ {

	type $mol_code__hint__2KIAF3U4 = $mol_type_enforce<
		ReturnType< $mol_app_supplies_list['search_hint'] >
		,
		ReturnType< $mol_code['hint'] >
	>
	type $mol_code__value__1TGGLZWS = $mol_type_enforce<
		ReturnType< $mol_app_supplies_list['search_query'] >
		,
		ReturnType< $mol_code['value'] >
	>
	type $mol_list__rows__6DJRKUDB = $mol_type_enforce<
		ReturnType< $mol_app_supplies_list['supply_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_app_supplies_card__supply__6R0PN50X = $mol_type_enforce<
		ReturnType< $mol_app_supplies_list['supply'] >
		,
		ReturnType< $mol_app_supplies_card['supply'] >
	>
	type $mol_app_supplies_card__arg__8R4OGMWG = $mol_type_enforce<
		ReturnType< $mol_app_supplies_list['supply_arg'] >
		,
		ReturnType< $mol_app_supplies_card['arg'] >
	>
	export class $mol_app_supplies_list extends $mol_page {
		search_hint( ): string
		search_query( next?: string ): string
		Search( ): $mol_code
		supply_rows( ): readonly($mol_view)[]
		Supply_rows( ): $mol_list
		supply( id: any): any
		supply_id( id: any): string
		supply_arg( id: any): ({ 
			'supply': ReturnType< $mol_app_supplies_list['supply_id'] >,
		}) 
		supplies( ): readonly($mol_app_supplies_domain_supply)[]
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
		Supply_row( id: any): $mol_app_supplies_card
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map