namespace $.$$ {
	export class $mol_list extends $.$mol_list {
		
		@ $mol_mem
		sub() {
			const rows = this.rows()
			return ( rows.length === 0 ) ? [ this.Empty() ] : rows
		}
		
		@ $mol_mem
		view_window() : [ number , number ] {
			
			const kids = this.sub()
			if( kids.length < 3 ) return [ 0 , kids.length ]
			
			let [ min , max ] = $mol_atom2_value( ()=> this.view_window() ) ?? [ 0 , 1 ]

			let max2 = max = Math.min( max , kids.length )
			let min2 = min = Math.max( 0 , Math.min( min , max - 1 ) )
			
			const window_height = $mol_window.size().height
			const over = Math.ceil( window_height * this.over_render() )
			const limit_top = -over
			const limit_bottom = window_height + over

			const rect = this.view_rect()

			const gap_before = $mol_atom2_value( ()=> this.gap_before() ) ?? 0
			const gap_after = $mol_atom2_value( ()=> this.gap_after() ) ?? 0

			let top = ( rect?.top ?? 0 ) + gap_before
			let bottom = ( rect?.bottom ?? 0 ) - gap_after

			if( top <= limit_top && bottom >= limit_bottom ) {
				return [ min2 , max2 ]
			}

			if(( bottom < limit_top )||( top > limit_bottom )) {

				min = 0
				top = ( rect?.top ?? 0 )
				
				while( min < ( kids.length - 1 ) ) {
					
					const height = kids[ min ].minimal_height()
					if( top + height >= limit_top ) break
					
					top += height
					++ min

				}

				min2 = min
				max2 = max = min + 1
				bottom = 0
	
			}

			let top2 = top
			let bottom2 = bottom

			if( top <= limit_top ) {
				min2 = max
				top2 = bottom
			}

			if( bottom >= limit_bottom ) {
				max2 = min
				bottom2 = top
			}

			while( bottom2 < limit_bottom && max2 < kids.length ) {
				bottom2 += kids[ max2 ].minimal_height()
				++ max2
			}

			while( top2 >= limit_top && min2 > 0 ) {
				-- min2
				top2 -= kids[ min2 ].minimal_height()
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

			var sub = super.sub_visible()

			const next = sub.slice( ... this.view_window() )
			
			if( this.gap_before() ) next.unshift( this.Gap_before() )
			if( this.gap_after() ) next.push( this.Gap_after() )

			return next
		}
		
		@ $mol_mem
		minimal_height() {
			var height = 0
			for( const child of this.sub() ) {
				if( child instanceof $mol_view ) {
					height += child.minimal_height()
				}
			}
			return height
		}

	}
}
