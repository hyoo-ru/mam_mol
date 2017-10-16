namespace $.$$ {
	
	export class $mol_perf_sierp extends $.$mol_perf_sierp {
		
		dots() {
			return this.data().map( ( props , index )=> this.Dot( index ) )
		}
		
		@ $mol_mem
		data() {
			return this.SierpinskiTriangle({ left : 0 , top : 0 , size : 1000 })
		}
		
		SierpinskiTriangle( id : { left : number , top : number , size : number } ) : { left : number , top : number , size : number }[] {
			
			const target = this.size_target()
			
			if( id.size < target ) {
				return [ { left : id.left - target / 2 , top : id.top - target / 2 , size : target } ]
			}
			
			const size = id.size / 2
			
			const e = performance.now() + 0.8;
			while (performance.now() < e) {
				// Artificially long execution time.
			}
			
			return [
				... this.SierpinskiTriangle({ left : id.left , top : id.top - size / 2 , size : size }) ,
				... this.SierpinskiTriangle({ left : id.left - size , top : id.top + size / 2 , size : size }) ,
				... this.SierpinskiTriangle({ left : id.left + size , top : id.top + size / 2 , size : size }) ,
			]
		}
		
		left( index : number ) {
			return this.data()[ index ].left
		}
		
		top( index : number ) {
			return this.data()[ index ].top
		}
		
		size( index: number ) {
			return this.data()[ index ].size * 1.3
		}
		
		@ $mol_mem
		text() {
			return ( ( $mol_state_time.now( 1000 ) / 1000 ) % 10 ).toFixed( 0 )
		}
		
		transform() {
			const t = ( $mol_state_time.now() / 1000 ) % 10
			const scale = 1 + (t > 5 ? 10 - t : t) / 10;
			return 'scale(' + (scale / 2.1) + ',0.7) translateZ(0.1px)'
		}
		
	}
	
	export class $mol_perf_sierp_dot extends $.$mol_perf_sierp_dot {
		
		sub() {
			return [ this.hover() ? `*${ this.text() }*` : this.text() ]
		}
		
		size_px() {
			return `${ this.size() }px`
		}
		
		radius() {
			return this.size() / 2
		}
		
		color() {
			return this.hover() ? '#ff0' : ''
		}
		
		enter( next : Event ) {
			this.hover( true )
		}
		
		leave( next : Event ) {
			this.hover( false )
		}
		
	}
	
}
