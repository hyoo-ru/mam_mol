namespace $ {

	export function $mol_style_attach(
		id : string ,
		text : string ,
	) {

		const doc = $mol_dom_context.document
		if( !doc ) return null
		
		const elid = `$mol_style_attach:${id}`
		
		let el = doc.getElementById( elid ) as HTMLStyleElement
		if( !el ) {
			el = doc.createElement('style')
			el.id = elid
			doc.head.appendChild( el )
		}
		if( el.innerHTML != text ) el.innerHTML = text
		
		return el
	}

}
