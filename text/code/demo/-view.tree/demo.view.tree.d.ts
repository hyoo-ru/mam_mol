declare namespace $ {

	type $mol_text_code__sidebar_showed__28IS4IFN = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_text_code__text__85AR7GQW = $mol_type_enforce<
		ReturnType< $mol_text_code_demo['source'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__syntax__VOUKDO2G = $mol_type_enforce<
		ReturnType< $mol_text_code_demo['syntax'] >
		,
		ReturnType< $mol_text_code['syntax'] >
	>
	type $mol_text_code__uri_resolve__1YFVXKUN = $mol_type_enforce<
		ReturnType< $mol_text_code_demo['uri_resolve'] >
		,
		ReturnType< $mol_text_code['uri_resolve'] >
	>
	export class $mol_text_code_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		source( ): string
		syntax( ): any
		uri_resolve( id: any): string
		Text( ): $mol_text_code
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map