namespace $.$$ {

	export class $mol_chart_graph extends $.$mol_chart_graph {

		color() {
			const hue = this.hue()
			if( !hue ) return ''
			const lightness = this.focused() ? 50 : 35
			return `hsl( ${ hue } , 100% , ${ lightness }% )`
		}

	}

}
