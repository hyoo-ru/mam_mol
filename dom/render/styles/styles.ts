namespace $ {
	
	export function $mol_dom_render_styles (
		el : Element ,
		styles : { [ key : string ] : string|number }
	) {
		for( let name in styles ) {
			let val = styles[ name ]
			
			const style = ( el as HTMLElement ).style as any
			const kebab = ( name : string )=> name.replace( /[A-Z]/g , letter => '-' + letter.toLowerCase() )
			
			if( typeof val === 'number' ) {
				style.setProperty(kebab(name), `${ val }px`);
			} else {
				style.setProperty(kebab(name), val);
			}
			
		}
	}

}
