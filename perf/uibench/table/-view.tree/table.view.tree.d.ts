declare namespace $ {

	type $mol_perf_uibench_table_row__state__A18KOGXH = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_table['row_state'] >
		,
		ReturnType< $mol_perf_uibench_table_row['state'] >
	>
	export class $mol_perf_uibench_table extends $mol_list {
		state( ): any
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_list['attr_static'] >
		sub( ): ReturnType< $mol_perf_uibench_table['rows'] >
		Row( id: any): $mol_perf_uibench_table_row
		rows( ): readonly(any)[]
		row_state( id: any): any
	}
	
	type $mol_perf_uibench_table_cell__text__G1Y030GF = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_table_row['cell_state'] >
		,
		ReturnType< $mol_perf_uibench_table_cell['text'] >
	>
	type $mol_perf_uibench_table_cell__text__H767Q2G6 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_table_row['head_text'] >
		,
		ReturnType< $mol_perf_uibench_table_cell['text'] >
	>
	export class $mol_perf_uibench_table_row extends $mol_view {
		state( ): any
		minimal_height( ): number
		dom_name( ): string
		attr( ): ({ 
			'class': ReturnType< $mol_perf_uibench_table_row['classes'] >,
			'data-id': ReturnType< $mol_perf_uibench_table_row['id'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
		Cell( id: any): $mol_perf_uibench_table_cell
		classes( ): string
		id( ): number
		head_text( ): string
		Head( ): $mol_perf_uibench_table_cell
		cells( ): readonly(any)[]
		cell_state( id: any): any
	}
	
	export class $mol_perf_uibench_table_cell extends $mol_view {
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_view['attr_static'] >
		event( ): ({ 
			click( next?: ReturnType< $mol_perf_uibench_table_cell['click'] > ): ReturnType< $mol_perf_uibench_table_cell['click'] >,
		})  & ReturnType< $mol_view['event'] >
		sub( ): readonly(any)[]
		click( next?: any ): any
		text( ): string
	}
	
}

//# sourceMappingURL=table.view.tree.d.ts.map