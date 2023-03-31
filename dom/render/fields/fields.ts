namespace $ {
	
	export function $mol_dom_render_fields (
		el : Element ,
		fields : { [ key : string ] : any }
	) {
		for( let key in fields ) {
			
			const val : any = fields[ key ]
			
			if( val === undefined ) continue
			
			(el as any)[ key ] = val
		}
	}

}
