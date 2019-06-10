namespace $.$$ {
	export class $mol_plot_graph extends $.$mol_plot_graph {
		@ $mol_mem
		points_raw(): [number, number][] {
			const series = this.series()
			
			return Object.keys( series ).map( (key, index) => [
				isNaN( Number( key ) ) ? index : Number( key ) ,
				series[ key ] ,
			] )
		}
		
		@ $mol_mem
		dimensions() {
			const points = this.points_raw()
			const next = [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			] as [[number, number], [number,number]]
			
			for(let point of points) {
				if( point[0] < next[0][0] ) next[0][0] = point[0]
				if( point[1] < next[0][1] ) next[0][1] = point[1]
				if( point[0] > next[1][0] ) next[1][0] = point[0]
				if( point[1] > next[1][1] ) next[1][1] = point[1]
			}
			
			return next
		}
		
		color() {
			const hue = this.hue()
			return hue ? `hsl( ${ hue } , 100% , 35% )` : ''
		}
		
		front() {
			return [ this ]
		}
		
	}
}
