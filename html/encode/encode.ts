namespace $ {
	
	const mapping = {
		'<' : '&lt;' ,
		'>' : '&gt;' ,
		'"' : '&quot;' ,
		'&' : '&amp;' ,
	}
	
	export function $mol_html_encode( text : string ) {
		return text.replace( /[&<">]/gi , str => mapping[ str as keyof typeof mapping ] )
	}
	
}
