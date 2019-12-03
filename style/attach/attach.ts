namespace $ {

	export function $mol_style_attach(
		id : string ,
		text : string ,
	) {

		const doc = $mol_dom_context.document
		const el = doc.createElement('style');
		
		el.id = `$mol_style:${ id }`
		el.innerHTML = '\n' + text
		
		doc.head.appendChild( el )

		return el

	}

}
