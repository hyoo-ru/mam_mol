namespace $ {

	export function $mol_dom_qname( name : string ) {
		return name.replace( /\W/ , '' ).replace( /^(?=\d+)/ , '_' )
	}

}
