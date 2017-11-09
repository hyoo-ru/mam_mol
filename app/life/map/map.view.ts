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
				for( let y = -1 ; y <= 1 ; ++y ) {
					for( let x = -1 ; x <= 1 ; ++x ) {
						if( !x && !y ) continue
						if( prev.has( key( px + x , py + y ) ) ) ++sum
					}
				}
				if( prev.has( key( px , py ) ) ) return ( sum === 2 || sum === 3 )
				else return sum == 3
			}

			const state = new Set<number>()
			const done = new Set<number>()

			for( let pos of prev ) {
				const px = x_of( pos )
				const py = y_of( pos )
				for( let y = py - 1 ; y <= py + 1 ; ++y ) {
					for( let x = px - 1 ; x <= px + 1 ; ++x ) {
						const k = key( x , y )
						if( done.has( k ) ) continue
						if( is_alive( x , y ) ) state.add( k )
						done.add( k )
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

		key_from_event( event : MouseEvent ) {
			const zoom = this.zoom()
			const pan = this.pan()
			
			const px = Math.round( ( event.offsetX - pan[0] ) / zoom )
			const py = Math.round( ( event.offsetY - pan[1] ) / zoom )
			
			return key( px , py )
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
			
			const state = new Set( this.state0() )
			const key = this.key_from_event( event )
			
			if( state.has( key ) ) state.delete( key )
			else state.add( key )
			
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
