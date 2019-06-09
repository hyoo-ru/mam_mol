namespace $.$$ {
	export class $mol_plot_line extends $.$mol_plot_line {
		
		curve() {
			const points = this.points()
			if( points.length < 1 ) return ''
			
			return 'M ' + points[0].join( ' ' ) + ' ' + points.map( point => 'L ' + point.join( ' ' ) ).join( ' ' )
		}
		
	}
}
