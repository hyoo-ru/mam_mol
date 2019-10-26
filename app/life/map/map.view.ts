namespace $.$$ {

	export class $mol_app_life_map extends $.$mol_app_life_map {

		@ $mol_mem
		state( next? : Set<number> ) {
			const snapshot = this.snapshot()
			if( next ) return next
			return new Set( snapshot.split( '~' ).map( v => parseInt( v , 16 ) ) )
		}

		@ $mol_mem
		snapshot_current() {
			return [ ... this.state() ].map( key => key.toString( 16 ) ).join( '~' )
		}

		@ $mol_mem
		cycle() {
			
			if( !this.speed() ) return null

			this.state()
			
			return new this.$.$mol_after_timeout( 1000 / this.speed() || 0 , this.step.bind( this ) )
		}

		@ $mol_fiber_solid.method
		step() {
			
			let prev = this.state()
		
			const state = new Set<number>()
			const skip = new Set<number>()

			for( let alive of prev ) {
				
				const ax = $mol_coord_high( alive )
				const ay = $mol_coord_low( alive )
				
				for( let ny = ay - 1 ; ny <= ay + 1 ; ++ny ) for( let nx = ax - 1 ; nx <= ax + 1 ; ++nx ) {

					const nkey = $mol_coord_pack( nx , ny )
					if( skip.has( nkey ) ) continue
					skip.add( nkey )
					
					let sum = 0

					for( let y = -1 ; y <= 1 ; ++y ) for( let x = -1 ; x <= 1 ; ++x ) {
						if( !x && !y ) continue
						if( prev.has( $mol_coord_pack( nx + x , ny + y ) ) ) ++sum
					}
					
					if( sum != 3 && ( !prev.has( nkey ) || sum !== 2 ) ) continue
					state.add( nkey )
					
				}

			}

			this.state( state )

		}

		@ $mol_mem
		population() {
			return this.state().size
		}

		@ $mol_mem
		points_x() {
			return [ ... this.state().keys() ].map(key => $mol_coord_high( key ))
		}

		@ $mol_mem
		points_y() {
			return [ ... this.state().keys() ].map(key => $mol_coord_low( key ))
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
			
			const cell = $mol_coord_pack(
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

		dom_tree() {
			this.cycle()
			return super.dom_tree()
		}
		
	}

}
