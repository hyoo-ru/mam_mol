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
		state0( next? : Set<number> ) {
			const snapshot = this.snapshot()
			if( next ) return next
			return new Set( snapshot.split( '~' ).map( v => parseInt( v , 16 ) ) )
		}

		@ $mol_mem
		snapshot_current() {
			return [ ... this.state() ].map( key => key.toString( 16 ) ).join( '~' )
		}

		@ $mol_mem
		state( next? : Set<number> ) {

			let prev = this.state0()

			if( !this.speed() ) return prev
			
			this.$.$mol_state_time.now( 1000 / this.speed() )
			
			function is_alive( px : number , py : number ) {
				let sum = 0
				for( let y = py - 1 ; y <= py + 1 ; ++y ) {
					for( let x = px - 1 ; x <= px + 1 ; ++x ) {
						if( prev.has( key( x , y ) ) ) ++sum
					}
				}
				if( prev.has( key( px , py ) ) ) return ( sum === 3 || sum === 4 )
				else return sum == 3
			}

			const state = new Set<number>()
			for( let pos of prev ) {
				const px = x_of( pos )
				const py = y_of( pos )
				for( let y = py - 1 ; y <= py + 1 ; ++y ) {
					for( let x = px - 1 ; x <= px + 1 ; ++x ) {
						if( is_alive( x , y ) ) state.add( key( x , y ) )
					}
				}
			}
			
			return this.state0( state )
		}

		@ $mol_mem
		population() {
			return this.state().size
		}

		points() {
			const points = [] as number[][]
			for( let key of this.state().keys() ) {
				points.push([ x_of( key ) , y_of( key ) ])
			}
			return points
		}

		cell_alive( id : number[] ) {
			return this.state()[ JSON.stringify( id ) ]
		}

		@ $mol_mem
		draw_alive( next : boolean = null ) {
			return next
		}

		key_from_event( event : MouseEvent ) {
			const zoom = this.zoom()
			const pan = this.pan()
			
			const px = Math.round( ( event.offsetX - pan[0] ) / zoom )
			const py = Math.round( ( event.offsetY - pan[1] ) / zoom )
			
			return key( px , py )
		}

		draw_start( event? : MouseEvent ) {
			this.draw_alive( !this.state().has( this.key_from_event( event ) ) )
			this.draw( event )
		}

		draw( event? : MouseEvent ) {
			if( !event.buttons ) return

			const state = new Set( this.state0() )
			const key = this.key_from_event( event )
			
			if( this.draw_alive() ) state.add( key )
			else state.delete( key )
			
			this.state0( state )
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
