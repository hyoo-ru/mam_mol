namespace $.$$ {
	export class $mol_plot_dot extends $.$mol_plot_dot {
		
		curve() {
			const points = this.points()
			if( points.length < 1 ) return ''
			
			return points.map( point => 'M ' + point.join( ' ' ) + ' v 0' ).join( ' ' )
		}
		
	}
}
