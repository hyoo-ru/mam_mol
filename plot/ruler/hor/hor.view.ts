namespace $.$mol {
	export class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
		
		count() {
			return this.points_raw().length * this.scale()[0] / 100
		}
		
		@ $mol_mem()
		step() {
			const count = this.count()
			let points = this.points_scaled()
			let step = Math.max( 1 , Math.ceil( points.length / count ) )
			return step
		}
		
		@ $mol_mem()
		indexes_visible() {
			const res = [] as number[]
			
			let points = this.points_raw()
			if( points.length === 0 ) return []
			
			let step = this.step()
			let limit = Math.floor( points.length - step / 2 )
			
			for( let i = 0 ; i < limit ; i += step ) {
				res.push( i )
			}
			res.push( points.length - 1 )
			
			return res
		}
		
		points() {
			const points = this.points_scaled()
			return this.indexes_visible().map( index => points[ index ] )
		}
		
		curve() {
			const shift = this.shift()
			const points = this.points()
			if( points.length < 1 ) return ''
			
			const last = points[ points.length - 1 ]
			
			return points.map( point => `M ${ point[0] } 1000 V 0` ).join( ' ' )
		}
		
		labels() {
			return this.points().map( ( point , index )=> this.Label( index ) )
		}
		
		label_pos( index : number ) {
			return [ this.points()[ index ][0] , '100%' ]
		}
		
		label_text( index : number ) {
			return String( Object.keys( this.series() )[ this.indexes_visible()[ index ] ] )
		}
		
	}
}
