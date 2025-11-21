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
			const next = ( rows.length === 0 ) ? [ this.Empty() ] : rows
			
			const prev = $mol_mem_cached( ()=> this.sub() )
			const [ start, end ] = $mol_mem_cached( ()=> this.view_window() ) ?? [ 0, 0 ]
			
			if( prev && $mol_mem_cached( ()=> prev[ start ] !== next[ start ] ) ) {
				const index = $mol_mem_cached( ()=> next.indexOf( prev[ start ] ) ) ?? -1
				if( index >= 0 ) this.view_window_shift( index - start )
			}
			
			return next
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
			
			const shift = this.view_window_shift()
			this.view_window_shift( 0 )
			
			min += shift
			max += shift

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
				return [ min2, max2 ]
			}

			// jumps when fully over limits
			if( anchoring && (( bottom < limit_top )||( top > limit_bottom )) ) {
				
				min = 0
				top = Math.ceil( rect?.top ?? 0 )
				
				while( min < ( kids.length - 1 ) ) {
					
					const height = this.item_height_min( min )
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
			if( anchoring && ( top < limit_top ) && ( bottom < limit_bottom ) && ( max < kids.length ) ) {
				min2 = max
				top2 = bottom
			}

			// force recalc max when overlapse bottom limit
			if( ( bottom > limit_bottom ) && ( top > limit_top ) && ( min > 0 ) ) {
				max2 = min
				bottom2 = top
			}

			// extend min to cover top limit
			while( anchoring && (( top2 > limit_top )&&( min2 > 0 )) ) {
				-- min2
				top2 -= this.item_height_min( min2 )
			}
			
			// extend max to cover bottom limit
			while( bottom2 < limit_bottom && max2 < kids.length ) {
				bottom2 += this.item_height_min( max2 )
				++ max2
			}
			
			return [ min2, max2 ]
		}
		
		item_height_min( index: number ) {
			try {
				return this.sub()[ index ]?.minimal_height() ?? 0
			} catch( error: any ) {
				$mol_fail_log( error )
				return 0
			}
		}

		row_width_min( index: number ) {
			try {
				return this.sub()[ index ]?.minimal_width() ?? 0
			} catch( error: any ) {
				$mol_fail_log( error )
				return 0
			}
		}

		@ $mol_mem
		gap_before() {
			let gap = 0
			const skipped = this.view_window()[0]
			for( let i = 0; i < skipped; ++ i ) gap += this.item_height_min( i )
			return gap
		}

		@ $mol_mem
		gap_after() {
			let gap = 0
			const from = this.view_window()[1]
			const to = this.sub().length
			for( let i = from; i < to; ++ i ) gap += this.item_height_min( i )
			return gap
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
			let height = 0
			const len = this.sub().length
			for( let i = 0; i < len; ++ i ) height += this.item_height_min( i )
			return height
		}

		@ $mol_mem
		minimal_width() {
			let width = 0
			const len = this.sub().length
			for( let i = 0; i < len; ++ i ) width = Math.max( width, this.item_width_min( i ) )
			return width
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
