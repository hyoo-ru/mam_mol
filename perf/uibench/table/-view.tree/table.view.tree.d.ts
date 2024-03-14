declare namespace $ {

	type $mol_perf_uibench_table_row__state__SI8AHJLL = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_table['row_state'] >
		,
		ReturnType< $mol_perf_uibench_table_row['state'] >
	>
	export class $mol_perf_uibench_table extends $mol_list {
		rows( ): readonly(any)[]
		row_state( id: any): any
		state( ): any
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_list['attr_static'] >
		sub( ): ReturnType< $mol_perf_uibench_table['rows'] >
		Row( id: any): $mol_perf_uibench_table_row
	}
	
	type $mol_perf_uibench_table_cell__text__N7XO0MQV = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_table_row['head_text'] >
		,
		ReturnType< $mol_perf_uibench_table_cell['text'] >
	>
	type $mol_perf_uibench_table_cell__text__Y5VVOJBD = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_table_row['cell_state'] >
		,
		ReturnType< $mol_perf_uibench_table_cell['text'] >
	>
	export class $mol_perf_uibench_table_row extends $mol_view {
		classes( ): string
		id( ): number
		head_text( ): string
		Head( ): $mol_perf_uibench_table_cell
		cells( ): readonly(any)[]
		cell_state( id: any): any
		state( ): any
		minimal_height( ): number
		dom_name( ): string
		attr( ): ({ 
			'class': ReturnType< $mol_perf_uibench_table_row['classes'] >,
			'data-id': ReturnType< $mol_perf_uibench_table_row['id'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
		Cell( id: any): $mol_perf_uibench_table_cell
	}
	
	export class $mol_perf_uibench_table_cell extends $mol_view {
		click( next?: any ): any
		text( ): string
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_view['attr_static'] >
		event( ): ({ 
			click( next?: ReturnType< $mol_perf_uibench_table_cell['click'] > ): ReturnType< $mol_perf_uibench_table_cell['click'] >,
		})  & ReturnType< $mol_view['event'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=table.view.tree.d.ts.map