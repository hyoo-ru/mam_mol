declare namespace $ {

	type $mol_view__sub__LZYLUGSS = $mol_type_enforce<
		ReturnType< $mol_perf_sierp['dots'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_perf_sierp_dot__left__EK2PHGGC = $mol_type_enforce<
		ReturnType< $mol_perf_sierp['left'] >
		,
		ReturnType< $mol_perf_sierp_dot['left'] >
	>
	type $mol_perf_sierp_dot__top__HXCRMXAC = $mol_type_enforce<
		ReturnType< $mol_perf_sierp['top'] >
		,
		ReturnType< $mol_perf_sierp_dot['top'] >
	>
	type $mol_perf_sierp_dot__size__FET92RSF = $mol_type_enforce<
		ReturnType< $mol_perf_sierp['size'] >
		,
		ReturnType< $mol_perf_sierp_dot['size'] >
	>
	type $mol_perf_sierp_dot__text__G7MWSLAE = $mol_type_enforce<
		ReturnType< $mol_perf_sierp['text'] >
		,
		ReturnType< $mol_perf_sierp_dot['text'] >
	>
	export class $mol_perf_sierp extends $mol_view {
		transform( ): string
		dots( ): readonly(any)[]
		Dots( ): $mol_view
		left( id: any): number
		top( id: any): number
		size( id: any): number
		text( ): string
		size_target( ): number
		elapsed( next?: number ): number
		style( ): ({ 
			'transform': ReturnType< $mol_perf_sierp['transform'] >,
		}) 
		sub( ): readonly(any)[]
		Dot( id: any): $mol_perf_sierp_dot
	}
	
	export class $mol_perf_sierp_dot extends $mol_view {
		text( ): string
		width( ): ReturnType< $mol_perf_sierp_dot['size'] >
		height( ): ReturnType< $mol_perf_sierp_dot['size'] >
		left( ): number
		top( ): number
		radius( ): ReturnType< $mol_perf_sierp_dot['size'] >
		color( ): string
		enter( next?: any ): any
		leave( next?: any ): any
		size( ): number
		size_px( ): string
		hover( next?: boolean ): boolean
		sub( ): readonly(any)[]
		style( ): ({ 
			'width': ReturnType< $mol_perf_sierp_dot['width'] >,
			'height': ReturnType< $mol_perf_sierp_dot['height'] >,
			'left': ReturnType< $mol_perf_sierp_dot['left'] >,
			'top': ReturnType< $mol_perf_sierp_dot['top'] >,
			'borderRadius': ReturnType< $mol_perf_sierp_dot['radius'] >,
			'lineHeight': ReturnType< $mol_perf_sierp_dot['size_px'] >,
			'background': ReturnType< $mol_perf_sierp_dot['color'] >,
		}) 
		event( ): ({ 
			mouseenter( next?: ReturnType< $mol_perf_sierp_dot['enter'] > ): ReturnType< $mol_perf_sierp_dot['enter'] >,
			mouseleave( next?: ReturnType< $mol_perf_sierp_dot['leave'] > ): ReturnType< $mol_perf_sierp_dot['leave'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=serp.view.tree.d.ts.map