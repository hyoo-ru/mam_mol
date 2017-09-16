namespace $.$$ {
	export class $mol_plot_bar extends $.$mol_plot_bar {
		
		curve() {
			const shift = this.shift()
			const points = this.points()
			if( points.length < 1 ) return ''
			
			return points.map( point => `M ${ point[0] } ${ shift[1] } V ${ point[1] }` ).join( ' ' )
		}
		
		stroke_width() {
			return ( 8 / Math.sqrt( this.points().length ) ).toPrecision(2) + '%'
		}
		
		color() {
			return `hsl( ${ this.hue() } , 70% , 85% )`
		}
		
		@ $mol_mem
		dimensions() {
			const points = this.points_raw()
			const next = [
				[ Number.POSITIVE_INFINITY , 0 ] ,
				[ Number.NEGATIVE_INFINITY , 0 ] ,
			]
			
			for( let point of points ) {
				if( point[0] < next[0][0] ) next[0][0] = point[0]
				if( point[1] < next[0][1] ) next[0][1] = point[1]
				if( point[0] > next[1][0] ) next[1][0] = point[0]
				if( point[1] > next[1][1] ) next[1][1] = point[1]
			}
			
			const gap = ( next[1][0] - next[0][0] ) / points.length || 0.00000001
			
			next[0][0] -= gap
			next[1][0] += gap
			
			return next
		}
		
	}
}
