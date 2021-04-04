namespace $ {

	export function $mol_dom_parse(
		text : string ,
		type : DOMParserSupportedType = 'application/xhtml+xml' ,
	) {

		const parser = new $mol_dom_context.DOMParser()
		const doc = parser.parseFromString( text , type )
		
		const error = doc.getElementsByTagName( 'parsererror' )
		if( error.length ) throw new Error( error[0].textContent! )

		return doc
	}

}
