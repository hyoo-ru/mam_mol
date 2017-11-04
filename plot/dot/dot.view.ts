namespace $.$$ {
	export class $mol_plot_dot extends $.$mol_plot_dot {

		@ $mol_mem
		points_visible() {
			const size = this.size_real()
			const radius = this.diameter() / 2

			return this.points().filter( point => {
				if( point[0] < - radius ) return false
				if( point[1] < - radius ) return false
				if( point[0] > size[0] + radius ) return false
				if( point[1] > size[1] + radius ) return false
				return true
			} )
		}
		
		@ $mol_mem
		curve() {
			const points = this.points_visible()
			if( points.length < 1 ) return ''
			
			return points.map( point => 'M ' + point.join( ' ' ) + ' v 0' ).join( ' ' )
		}
		
	}
}
