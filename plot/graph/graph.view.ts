namespace $.$$ {
	export class $mol_plot_graph extends $.$mol_plot_graph {
		
		points_raw() {
			const series = this.series()
			
			return Object.keys( series ).map( ( key , index )=> [
				isNaN( Number( key ) ) ? index : Number( key ) ,
				series[ key ] ,
			] )
		}
		
		@ $mol_mem
		points_scaled() {
			const shift = this.shift()
			const scale = this.scale()
			return this.points_raw().map( point => [
				Math.round( shift[0] + point[0] * scale[0] ) ,
				Math.round( shift[1] + point[1] * scale[1] ) ,
			] )
		}
		
		@ $mol_mem
		points() {
			const threshold = this.threshold()
			if( !threshold ) return this.points_scaled()

			const res = [] as number[][]
			let last = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ]
			this.points_scaled().forEach( point => {
				check : {
					if( Math.abs( point[ 0 ] - last[ 0 ] ) >= threshold ) break check
					if( Math.abs( point[ 1 ] - last[ 1 ] ) >= threshold ) break check
					return
				}
				res.push( last = point )
			} )
			return res
		}
		
		@ $mol_mem
		dimensions() {
			const points = this.points_raw()
			const next = [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			]
			
			for( let point of points ) {
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
