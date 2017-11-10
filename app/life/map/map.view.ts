namespace $.$$ {

	function key( a : number , b : number ) {
		return a << 16 | b & 0xFFFF
	}

	function x_of( key : number ) {
		return key >> 16
	}

	function y_of( key : number ) {
		return ( key & 0xFFFF ) << 16 >> 16
	}

	export class $mol_app_life_map extends $.$mol_app_life_map {

		@ $mol_mem
		state( next? : Set<number> ) {
			const snapshot = this.snapshot()
			if( next ) return next
			return new Set( snapshot.split( '~' ).map( v => parseInt( v , 16 ) ) )
		}

		@ $mol_mem
		snapshot_current() {
			return [ ... this.future() ].map( key => key.toString( 16 ) ).join( '~' )
		}

		@ $mol_mem
		future( next? : Set<number> ) {

			let prev = this.state()

			if( !this.speed() ) return prev
			
			this.$.$mol_state_time.now( 1000 / this.speed() )
			
			const state = new Set<number>()
			const skip = new Set<number>()

			for( let alive of prev ) {
				
				const ax = x_of( alive )
				const ay = y_of( alive )
				
				for( let ny = ay - 1 ; ny <= ay + 1 ; ++ny ) for( let nx = ax - 1 ; nx <= ax + 1 ; ++nx ) {

					const nkey = key( nx , ny )
					if( skip.has( nkey ) ) continue
					skip.add( nkey )
					
					let sum = 0

					for( let y = -1 ; y <= 1 ; ++y ) for( let x = -1 ; x <= 1 ; ++x ) {
						if( !x && !y ) continue
						if( prev.has( key( nx + x , ny + y ) ) ) ++sum
					}
					
					if( sum != 3 && ( !prev.has( nkey ) || sum !== 2 ) ) continue
					state.add( nkey )
					
				}

			}
			
			return this.state( state )
		}

		@ $mol_mem
		population() {
			return this.future().size
		}

		points() {
			const points = [] as number[][]
			for( let key of this.future().keys() ) {
				points.push([ x_of( key ) , y_of( key ) ])
			}
			return points
		}

		@ $mol_mem
		draw_start_pos( next? : number[] ) {
			return next
		}

		draw_start( event? : MouseEvent ) {
			this.draw_start_pos([ event.pageX , event.pageY ])
		}

		draw_end( event? : MouseEvent ) {
			const start_pos = this.draw_start_pos()
			const pos = [ event.pageX , event.pageY ]
			
			if( Math.abs( start_pos[0] - pos[0] ) > 4 ) return
			if( Math.abs( start_pos[1] - pos[1] ) > 4 ) return
			
			const zoom = this.zoom()
			const pan = this.pan()
			const rect = this.dom_node().getBoundingClientRect()
			
			const cell = key(
				Math.round( ( event.pageX - rect.left - pan[0] ) / zoom ) ,
				Math.round( ( event.pageY - rect.top - pan[1] ) / zoom ) ,
			)
			
			const state = new Set( this.state() )
			if( state.has( cell ) ) state.delete( cell )
			else state.add( cell )
			
			this.state( state )
		}

		@ $mol_mem
		zoom( next = super.zoom() ) {
			return Math.max( 1 , next )
		}
		
		@ $mol_mem
		pan( next? : number[] ) {
			return next || this.size_real().map( v => v / 2 )
		}
		
	}

}
