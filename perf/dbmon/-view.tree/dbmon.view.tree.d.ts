declare namespace $ {

	type $mol_list__rows__LJFW289M = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['databases'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__sub__MZN28L4H = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_perf_dbmon_query_count__label_mod__5QWOUVU2 = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_count_label_mod'] >
		,
		ReturnType< $mol_perf_dbmon_query_count['label_mod'] >
	>
	type $mol_perf_dbmon_query_count__count__R8PDS5XJ = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_count'] >
		,
		ReturnType< $mol_perf_dbmon_query_count['count'] >
	>
	type $mol_view__sub__D7XMTVL7 = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['database'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_perf_dbmon_query__elapsed__6LSABEDN = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_elapsed'] >
		,
		ReturnType< $mol_perf_dbmon_query['elapsed'] >
	>
	type $mol_perf_dbmon_query__elapsed_mod__64R9YJ2Y = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_elapsed_mod'] >
		,
		ReturnType< $mol_perf_dbmon_query['elapsed_mod'] >
	>
	type $mol_perf_dbmon_query__value__KT2P9FFJ = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_value'] >
		,
		ReturnType< $mol_perf_dbmon_query['value'] >
	>
	export class $mol_perf_dbmon extends $mol_scroll {
		databases( ): readonly(any)[]
		Databases( ): $mol_list
		name( id: any): string
		Name( id: any): $mol_view
		query_count_label_mod( id: any): string
		query_count( id: any): number
		Query_count( id: any): $mol_perf_dbmon_query_count
		top_queries( id: any): readonly(any)[]
		database( id: any): readonly(any)[]
		query_elapsed( id: any): string
		query_elapsed_mod( id: any): string
		query_value( id: any): string
		title( ): string
		sub( ): readonly(any)[]
		Database( id: any): $mol_view
		Query( id: any): $mol_perf_dbmon_query
	}
	
	type $mol_view__attr__EP0I1C8O = $mol_type_enforce<
		({ 
			'mol_perf_dbmon_query_count_label': ReturnType< $mol_perf_dbmon_query_count['label_mod'] >,
		}) 
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub__ZFCUMJ13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_perf_dbmon_query_count extends $mol_view {
		label_mod( ): string
		count( ): number
		Label( ): $mol_view
		sub( ): readonly(any)[]
	}
	
	type $mol_view__attr__XVWB1B2U = $mol_type_enforce<
		({ 
			'mol_perf_dbmon_query_elapsed': ReturnType< $mol_perf_dbmon_query['elapsed_mod'] >,
		}) 
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub__RC1GR9X1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_perf_dbmon_query extends $mol_pop_over {
		elapsed_mod( ): string
		elapsed( ): string
		Elapsed( ): $mol_view
		value( ): string
		minimal_height( ): number
		Anchor( ): ReturnType< $mol_perf_dbmon_query['Elapsed'] >
		bubble_content( ): readonly(any)[]
		align( ): string
	}
	
}

//# sourceMappingURL=dbmon.view.tree.d.ts.map