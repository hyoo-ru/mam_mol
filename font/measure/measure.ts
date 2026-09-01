namespace $ {

	export function $mol_font_measure( font: string, text: string ) {
		const canvas = $mol_font_canvas()
		canvas.font = font
		return canvas.measureText( text ).width
	}

}
