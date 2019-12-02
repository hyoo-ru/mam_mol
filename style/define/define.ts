namespace $ {

	export function $mol_style_define<
		Component extends $mol_view
	>(
		Component : new()=> Component ,
		config : $mol_style_definition< Component > ,
	) {

		const doc = $mol_dom_context.document
		const el = doc.createElement('style');
		el.innerHTML = $mol_style_sheet( Component , config )
		doc.head.appendChild( el )

		return el

	}

}
