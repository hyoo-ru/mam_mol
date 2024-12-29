namespace $ {
	
	export function $mol_dom_render_fields (
		el : Element ,
		fields : { [ key : string ] : any }
	) {
		for( let key in fields ) {
			
			const val : any = fields[ key ]
			
			if( val === undefined ) continue
			if( val === (el as any)[ key ] ) continue
			
			(el as any)[ key ] = val
		}
	}

}
