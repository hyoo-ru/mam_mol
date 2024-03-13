namespace $.$$ {

	/**
	 * The list of rows with lazy/virtual rendering support based on `minimal_height` of rows.
	 * `mol_list` should contain only components that inherits `mol_view`. You should not place raw strings or numbers in list.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_list_demo
	 */
	export class $mol_list extends $.$mol_list {
		
		@ $mol_mem
		sub() {
			const rows = this.rows()
			return ( rows.length === 0 ) ? [ this.Empty() ] : rows
		}

		render_visible_only() {
			return this.$.$mol_support_css_overflow_anchor()
		}

		@ $mol_mem
		view_window( next?: [ number , number ] ) : [ number , number ] {
			
			const kids = this.sub()
			
			if( kids.length < 3 ) return [ 0 , kids.length ]
			if( this.$.$mol_print.active() ) return [ 0 , kids.length ]
			
			const rect = this.view_rect()
			if( next ) return next
			
			let [ min , max ] = $mol_mem_cached( ()=> this.view_window() ) ?? [ 0 , 0 ]

			let max2 = max = Math.min( max , kids.length )
			let min2 = min = Math.max( 0 , Math.min( min , max - 1 ) )
			
			const anchoring = this.render_visible_only()
			const window_height = this.$.$mol_window.size().height + 40
			const over = Math.ceil( window_height * this.render_over() )
			const limit_top = -over
			const limit_bottom = window_height + over

			const gap_before = $mol_mem_cached( ()=> this.gap_before() ) ?? 0
			const gap_after = $mol_mem_cached( ()=> this.gap_after() ) ?? 0

			let top = Math.ceil( rect?.top ?? 0 ) + gap_before
			let bottom = Math.ceil( rect?.bottom ?? 0 ) - gap_after

			// change nothing when already covers all limits
			if( top <= limit_top && bottom >= limit_bottom ) {
				return [ min2 , max2 ]
			}

			// jumps when fully over limits
			if( anchoring && (( bottom < limit_top )||( top > limit_bottom )) ) {
				
				min = 0
				top = Math.ceil( rect?.top ?? 0 )
				
				while( min < ( kids.length - 1 ) ) {
					
					const height = kids[ min ].minimal_height()
					if( top + height >= limit_top ) break
					
					top += height
					++ min

				}

				min2 = min
				max2 = max = min
				bottom = top

			}

			let top2 = top
			let bottom2 = bottom
			
			// force recalc min when overlapse top limit
			if( anchoring && ( top <= limit_top ) && ( bottom < limit_bottom ) ) {
				min2 = max
				top2 = bottom
			}

			// force recalc max when overlapse bottom limit
			if( ( bottom >= limit_bottom ) && ( top > limit_top ) ) {
				max2 = min
				bottom2 = top
			}

			// extend min to cover top limit
			while( anchoring && (( top2 > limit_top )&&( min2 > 0 )) ) {
				-- min2
				top2 -= kids[ min2 ].minimal_height()
			}
			
			// extend max to cover bottom limit
			while( bottom2 < limit_bottom && max2 < kids.length ) {
				bottom2 += kids[ max2 ].minimal_height()
				++ max2
			}
			
			return [ min2 , max2 ]
		}

		@ $mol_mem
		gap_before() {
			const skipped = this.sub().slice( 0 , this.view_window()[0] )
			return Math.max( 0 , skipped.reduce( ( sum , view )=> sum + view.minimal_height() , 0 ) )
		}

		@ $mol_mem
		gap_after() {
			const skipped = this.sub().slice( this.view_window()[1] )
			return Math.max( 0 , skipped.reduce( ( sum , view )=> sum + view.minimal_height() , 0 ) )
		}

		@ $mol_mem
		sub_visible() {
			return [
				... this.gap_before() ? [ this.Gap_before() ] : [],
				... this.sub().slice( ... this.view_window() ),
				... this.gap_after() ? [ this.Gap_after() ] : [],
			]
		}
		
		@ $mol_mem
		minimal_height() {

			return this.sub().reduce( ( sum , view )=> {

				try {
					return sum + view.minimal_height() 
				} catch( error: any ) {
					$mol_fail_log( error )
					return sum
				}

			} , 0 )

		}

		force_render(
			path : Set< $mol_view >,
		) {

			const kids = this.rows()

			const index = kids.findIndex( item => path.has( item ) )

			if( index >= 0 ) {
				const win = this.view_window()
				if( index < win[0] || index >= win[1] ) {
					this.view_window([ this.render_visible_only() ? index : 0, index + 1 ])
				}
				( kids[ index ] as $mol_view ).force_render( path )
			}
			
		}

	}
}
