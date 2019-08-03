namespace $ {

	export let $mol_jsx_prefix = ''

	export let $mol_jsx_booked = null as null | Set< string >
	
	export let $mol_jsx_document : JSX.ElementClass['ownerDocument'] = {
		getElementById : ()=> null ,
		createElement : ( name : string )=> $mol_dom_context.document.createElement( name )
	}

}
