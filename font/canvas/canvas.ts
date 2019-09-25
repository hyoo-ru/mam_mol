namespace $ {

	let canvas : CanvasRenderingContext2D

	export function $mol_font_canvas( next = canvas ) {
		if( !next ) next = $mol_dom_context.document.createElement( 'canvas' ).getContext( '2d' )!
		return canvas = next
	}

}
