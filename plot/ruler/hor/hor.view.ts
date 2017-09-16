namespace $.$$ {
	export class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
		
		count() {
			return this.points_raw().length * this.scale()[0] / 100
		}
		
		@ $mol_mem
		step() {
			const count = this.count()
			let points = this.points_scaled()
			let step = Math.max( 1 , Math.ceil( points.length / count ) )
			return step
		}
		
		@ $mol_mem
		keys_visible() {
			const res = [] as string[]
			
			const keys = Object.keys( this.series() ) 
			if( keys.length === 0 ) return []
			
			let step = this.step()
			let limit = Math.floor( keys.length - step / 2 )
			
			for( let i = 0 ; i < limit ; i += step ) {
				res.push( keys[ i ] )
			}
			res.push( keys[ keys.length - 1 ] )
			
			return res
		}
		
		points() {
			const points = this.points_scaled()
			const keys = Object.keys( this.series() )
			return this.keys_visible().map( key => points[ keys.indexOf( key ) ] )
		}
		
		curve() {
			const shift = this.shift()
			const points = this.points()
			if( points.length < 1 ) return ''
			
			const last = points[ points.length - 1 ]
			
			return points.map( point => `M ${ point[0] } 1000 V 0` ).join( ' ' )
		}
		
		labels() {
			return this.keys_visible().map( key => this.Label( key ) )
		}
		
		label_pos_x( key : string ) {
			return String( this.points()[ this.keys_visible().indexOf( key ) ][0] )
		}
		
		label_text( key : string ) {
			return key
		}
		
		back() {
			return [ this ]
		}
		
	}
}
