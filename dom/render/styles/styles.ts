namespace $ {
	
	export function $mol_dom_render_styles (
		el : Element ,
		styles : { [ key : string ] : string|number }
	) {
		for( let name in styles ) {
			let val = styles[ name ]
			
			const style = ( el as HTMLElement ).style as any
			const cur = style[ name ]
			
			if( typeof val === 'number' ) {
				if( parseFloat( cur ) == val ) continue
				style[ name ] = `${ val }px`
			}
			
			if( cur !== val ) style[ name ] = val
		}
	}

}
