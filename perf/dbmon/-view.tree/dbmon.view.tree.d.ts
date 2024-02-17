declare namespace $ {

	type $mol_view__sub__WN0DK7XI = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['database'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_perf_dbmon_query__elapsed__20V47J8T = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_elapsed'] >
		,
		ReturnType< $mol_perf_dbmon_query['elapsed'] >
	>
	type $mol_perf_dbmon_query__elapsed_mod__74YVS9F8 = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_elapsed_mod'] >
		,
		ReturnType< $mol_perf_dbmon_query['elapsed_mod'] >
	>
	type $mol_perf_dbmon_query__value__871X3CTC = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_value'] >
		,
		ReturnType< $mol_perf_dbmon_query['value'] >
	>
	type $mol_list__rows__3F3L5G8Z = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['databases'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__sub__O2Z0L3AM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_perf_dbmon_query_count__label_mod__WTPZMKUQ = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_count_label_mod'] >
		,
		ReturnType< $mol_perf_dbmon_query_count['label_mod'] >
	>
	type $mol_perf_dbmon_query_count__count__GVV3Z7A2 = $mol_type_enforce<
		ReturnType< $mol_perf_dbmon['query_count'] >
		,
		ReturnType< $mol_perf_dbmon_query_count['count'] >
	>
	export class $mol_perf_dbmon extends $mol_scroll {
		title( ): string
		sub( ): readonly(any)[]
		Database( id: any): $mol_view
		Query( id: any): $mol_perf_dbmon_query
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
	}
	
	type $mol_view__attr__AGIMQJWH = $mol_type_enforce<
		({ 
			'mol_perf_dbmon_query_count_label': ReturnType< $mol_perf_dbmon_query_count['label_mod'] >,
		}) 
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub__6QCG9LZL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_perf_dbmon_query_count extends $mol_view {
		sub( ): readonly(any)[]
		label_mod( ): string
		count( ): number
		Label( ): $mol_view
	}
	
	type $mol_view__attr__ATK4GMJ3 = $mol_type_enforce<
		({ 
			'mol_perf_dbmon_query_elapsed': ReturnType< $mol_perf_dbmon_query['elapsed_mod'] >,
		}) 
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub__3YL9J0ES = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_perf_dbmon_query extends $mol_pop_over {
		minimal_height( ): number
		Anchor( ): ReturnType< $mol_perf_dbmon_query['Elapsed'] >
		bubble_content( ): readonly(any)[]
		align( ): string
		elapsed_mod( ): string
		elapsed( ): string
		Elapsed( ): $mol_view
		value( ): string
	}
	
}

//# sourceMappingURL=dbmon.view.tree.d.ts.map