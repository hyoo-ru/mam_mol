declare namespace $ {

	type $mol_list__rows__Q94DGTXB = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['databases'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__sub__F9NX9BJZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_perf_dbmon_query_count__label_mod__RSTP5DTM = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_count_label_mod'] >
		,
		ReturnType< $mol_perf_dbmon_query_count['label_mod'] >
	>
	type $mol_perf_dbmon_query_count__count__RR7F93P3 = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_count'] >
		,
		ReturnType< $mol_perf_dbmon_query_count['count'] >
	>
	type $mol_view__sub__7CD79UM8 = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['database'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_perf_dbmon_query__elapsed__8T6R7D1O = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_elapsed'] >
		,
		ReturnType< $mol_perf_dbmon_query['elapsed'] >
	>
	type $mol_perf_dbmon_query__elapsed_mod__0ZPDLNKU = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_elapsed_mod'] >
		,
		ReturnType< $mol_perf_dbmon_query['elapsed_mod'] >
	>
	type $mol_perf_dbmon_query__value__E1SN081H = $mol_type_enforce<
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
	
	type $mol_view__attr__AE5FCB5D = $mol_type_enforce<
		({ 
			'mol_perf_dbmon_query_count_label': ReturnType< $mol_perf_dbmon_query_count['label_mod'] >,
		}) 
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub__MQ304HSM = $mol_type_enforce<
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
	
	type $mol_view__attr__XLY6TNGL = $mol_type_enforce<
		({ 
			'mol_perf_dbmon_query_elapsed': ReturnType< $mol_perf_dbmon_query['elapsed_mod'] >,
		}) 
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub__I4M2WKK2 = $mol_type_enforce<
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