namespace $ {
	
	export function $mol_dom_render_styles (
		el : Element ,
		styles : { [ key : string ] : string|number }
	) {
		for( let name in styles ) {
			let val = styles[ name ]
			
			const style = ( el as HTMLElement ).style as any
			
			if( typeof val === 'number' ) {
				style[ name ] = `${ val }px`
			} else {
				style[ name ] = val
			}
			
		}
	}

}
