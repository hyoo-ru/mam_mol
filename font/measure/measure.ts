namespace $ {

	export function $mol_font_measure( size : number , face : string , text : string ) {
		const canvas = $mol_font_canvas()
		canvas.font = size + 'px ' + face
		return Math.ceil( canvas.measureText( text ).width )
	}

}
