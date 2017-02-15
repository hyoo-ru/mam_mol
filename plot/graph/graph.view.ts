namespace $.$mol {
	export class $mol_plot_graph extends $.$mol_plot_graph {
		
		points() {
			return this.series().map( ( val , i )=> [ i , val ] )
		}
		
		points_scaled() {
			const shift = this.shift()
			const scale = this.scale()
			return this.points().map( point => [
				( point[0] + shift[0] ) * scale[0] ,
				( point[1] + shift[1] ) * scale[1] ,
			] )
		}
		
		@ $mol_mem()
		dimensions() {
			const points = this.points()
			const next = [ [ 0 , 0 ] , [ 0 , 0 ] ]
			
			for( let point of points ) {
				if( point[0] < next[0][0] ) next[0][0] = point[0]
				if( point[1] < next[0][1] ) next[0][1] = point[1]
				if( point[0] > next[1][0] ) next[1][0] = point[0]
				if( point[1] > next[1][1] ) next[1][1] = point[1]
			}
			
			return next
		}
		
		color_stroke() {
			return `hsl( ${ this.hue() } , 80% , 60% )`
		}
		
		color_fill() {
			return `hsl( ${ this.hue() } , 70% , 70% )`
		}
		
	}
}
