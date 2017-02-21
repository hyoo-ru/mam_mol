namespace $.$mol {
	export class $mol_plot_graph extends $.$mol_plot_graph {
		
		points_raw() {
			return this.series().map( ( val , i )=> [ i , val ] )
		}
		
		@ $mol_mem()
		points_scaled() {
			const shift = this.shift()
			const scale = this.scale()
			return this.points_raw().map( point => [
				shift[0] + point[0] * scale[0] ,
				shift[1] + point[1] * scale[1] ,
			] )
		}
		
		@ $mol_mem()
		points() {
			const res = [] as number[][]
			let last = [ - Number.NEGATIVE_INFINITY , - Number.NEGATIVE_INFINITY ]
			this.points_scaled().forEach( point => {
				check : {
					if( Math.abs( point[ 0 ] - last[ 0 ] ) > 5 ) break check
					if( Math.abs( point[ 1 ] - last[ 1 ] ) > 5 ) break check
					return
				}
				res.push( last = point )
			} )
			return res
		}
		
		@ $mol_mem()
		dimensions() {
			const points = this.points_raw()
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
