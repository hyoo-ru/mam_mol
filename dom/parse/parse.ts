namespace $ {

	export function $mol_dom_parse(
		text : string ,
		type : SupportedType = 'application/xhtml+xml' ,
	) {

		const parser = new DOMParser()
		const doc = parser.parseFromString( text , type )
		
		const error = doc.getElementsByTagName( 'parsererror' )[0]
		if( error ) throw new Error( error.textContent! )

		return doc
	}

}
