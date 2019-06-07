namespace $.$$ {
	export class $mol_plot_line extends $.$mol_plot_line {
		
		curve() {
			const points = this.points().scaled
			if( points.length < 1 ) return ''
			
			return 'M ' + points[0].join( ' ' ) + ' ' + points.map( point => 'L ' + point.join( ' ' ) ).join( ' ' )
		}
		
	}
}
