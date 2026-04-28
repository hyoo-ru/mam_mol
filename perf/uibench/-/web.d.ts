declare namespace $ {

	export class $mol_scroll extends $mol_view {
		tabindex( ): number
		event_scroll( next?: any ): any
		scroll_top( next?: number ): number
		scroll_left( next?: number ): number
		attr( ): ({ 
			'tabindex': ReturnType< $mol_scroll['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			scroll( next?: ReturnType< $mol_scroll['event_scroll'] > ): ReturnType< $mol_scroll['event_scroll'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=scroll.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__style_mol_list_1 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_before'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style_mol_list_2 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_after'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	export class $mol_list extends $mol_view {
		gap_before( ): number
		Gap_before( ): $mol_view
		Empty( ): $mol_view
		gap_after( ): number
		Gap_after( ): $mol_view
		rows( ): readonly($mol_view)[]
		render_visible_only( ): boolean
		render_over( ): number
		sub( ): ReturnType< $mol_list['rows'] >
		item_height_min( id: any): number
		item_width_min( id: any): number
		view_window_shift( next?: number ): number
		view_window( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	type $mol_perf_uibench_table_row__state_mol_perf_uibench_table_1 = $mol_type_enforce<
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
	
	type $mol_perf_uibench_table_cell__text_mol_perf_uibench_table_row_1 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_table_row['head_text'] >
		,
		ReturnType< $mol_perf_uibench_table_cell['text'] >
	>
	type $mol_perf_uibench_table_cell__text_mol_perf_uibench_table_row_2 = $mol_type_enforce<
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
declare namespace $ {

	type $mol_perf_uibench_anim_box__state_mol_perf_uibench_anim_1 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_anim['box_state'] >
		,
		ReturnType< $mol_perf_uibench_anim_box['state'] >
	>
	export class $mol_perf_uibench_anim extends $mol_view {
		boxes( ): readonly(any)[]
		box_state( id: any): any
		state( ): any
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_view['attr_static'] >
		sub( ): ReturnType< $mol_perf_uibench_anim['boxes'] >
		Box( id: any): $mol_perf_uibench_anim_box
	}
	
	export class $mol_perf_uibench_anim_box extends $mol_view {
		id( ): string
		style_radius( ): string
		style_color( ): string
		state( ): any
		attr( ): ({ 
			'class': string,
			'data-id': ReturnType< $mol_perf_uibench_anim_box['id'] >,
		})  & ReturnType< $mol_view['attr'] >
		style( ): ({ 
			'borderRadius': ReturnType< $mol_perf_uibench_anim_box['style_radius'] >,
			'background': ReturnType< $mol_perf_uibench_anim_box['style_color'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=anim.view.tree.d.ts.map
declare namespace $ {

	type $mol_perf_uibench_tree_branch__state_mol_perf_uibench_tree_1 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_tree['root_state'] >
		,
		ReturnType< $mol_perf_uibench_tree_branch['state'] >
	>
	export class $mol_perf_uibench_tree extends $mol_view {
		root_state( ): any
		Root( ): $mol_perf_uibench_tree_branch
		state( ): any
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_view['attr_static'] >
		sub( ): readonly(any)[]
	}
	
	type $mol_perf_uibench_tree_branch__state_mol_perf_uibench_tree_branch_1 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_tree_branch['branch_state'] >
		,
		ReturnType< $mol_perf_uibench_tree_branch['state'] >
	>
	type $mol_perf_uibench_tree_leaf__text_mol_perf_uibench_tree_branch_2 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench_tree_branch['leaf_state'] >
		,
		ReturnType< $mol_perf_uibench_tree_leaf['text'] >
	>
	export class $mol_perf_uibench_tree_branch extends $mol_list {
		branch_state( id: any): any
		leaf_state( id: any): any
		state( ): any
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_list['attr_static'] >
		Branch( id: any): $mol_perf_uibench_tree_branch
		Leaf( id: any): $mol_perf_uibench_tree_leaf
	}
	
	export class $mol_perf_uibench_tree_leaf extends $mol_view {
		text( ): string
		minimal_height( ): number
		dom_name( ): string
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_view['attr_static'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=tree.view.tree.d.ts.map
declare namespace $ {

	type $mol_perf_uibench_table__state_mol_perf_uibench_1 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench['table_state'] >
		,
		ReturnType< $mol_perf_uibench_table['state'] >
	>
	type $mol_perf_uibench_anim__state_mol_perf_uibench_2 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench['anim_state'] >
		,
		ReturnType< $mol_perf_uibench_anim['state'] >
	>
	type $mol_perf_uibench_tree__state_mol_perf_uibench_3 = $mol_type_enforce<
		ReturnType< $mol_perf_uibench['tree_state'] >
		,
		ReturnType< $mol_perf_uibench_tree['state'] >
	>
	export class $mol_perf_uibench extends $mol_scroll {
		table_state( ): any
		Table( ): $mol_perf_uibench_table
		anim_state( ): any
		Anim( ): $mol_perf_uibench_anim
		tree_state( ): any
		Tree( ): $mol_perf_uibench_tree
		attr_static( ): ({ 
			'class': string,
		})  & ReturnType< $mol_scroll['attr_static'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=uibench.view.tree.d.ts.map
export = $;
//# sourceMappingURL=web.d.ts.map
