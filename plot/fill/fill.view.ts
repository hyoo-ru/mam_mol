namespace $.$$ {
	export class $mol_plot_fill extends $.$mol_plot_fill {
		
		curve() {
			const shift = this.shift()
			const points = this.points()
			if( points.length < 1 ) return ''
			
			const main = points.map( point => 'L ' + point.join( ' ' ) ).join( ' ' )
			return `M ${ points[0].join( ' ' ) } ${ main } V ${ shift[1] } H ${ points[0][0] }`
		}
		
		back() {
			return [ this ]
		}
		
	}
}
