namespace $.$$ {
	export class $mol_list extends $.$mol_list {
		
		@ $mol_mem
		sub() {
			const rows = this.rows()
			return ( rows.length === 0 ) ? [ this.Empty() ] : rows
		}
		
		normal_direction = true
		
		@ $mol_mem
		view_window() : [ number , number ] {
			
			const kids = this.sub()
			if( kids.length < 3 ) return [ 0 , kids.length ]
			
			let [ min , max ] = $mol_atom2_value( ()=> this.view_window() || [ 0 , 1 ] )

			max = Math.min( max , kids.length )
			min = Math.min( min , max )
			
			const window_height = $mol_window.size().height
			const ext = window_height
			let bottom_free = window_height
			let top_free = 0

			if( max > 0 ) {

				const rect = kids[ max - 1 ].view_rect()
				if( rect ) {
					bottom_free -= rect.bottom
				} else {
					bottom_free = 0
				}

				if( bottom_free > window_height ) {
	
					const factor = ( - rect.bottom + window_height / 2 ) / $mol_atom2_value( ()=> this.gap_bottom() )
					if( factor < 1 ) {

						this.normal_direction = false

						max += Math.floor( ( kids.length - max ) * factor )
						max = Math.min( kids.length , Math.max( 1 , max ) )
	
						kids[ max - 1 ].view_rect()
	
						return [ max - 1 , max ]
					}
					
				}

			}

			if( true ) {

				const rect = kids[ min ].view_rect()
				if( rect ) top_free += rect.top
				
				if( top_free > window_height ) {
	
					const factor = ( rect.top - window_height / 2 ) / $mol_atom2_value( ()=> this.gap_top() )
					if( factor < 1 ) {

						this.normal_direction = true

						min = Math.floor( min * ( 1 - factor ) )
						kids[ min ].view_rect()
	
						return [ min , min + 1 ]
					}
					
				}
				
			}

			while( top_free > -ext && min > 0 ) {
				-- min
				top_free -= kids[ min ].minimal_height()
				this.normal_direction = false
			}

			while( bottom_free > -ext && max < kids.length ) {
				bottom_free -= kids[ max ].minimal_height()
				++ max
				this.normal_direction = true
			}

			if( !this.normal_direction && max > min + 1 ) {
				const rect = kids[ max - 1 ].view_rect()
				if( rect && rect.top > $mol_window.size().height + ext ) {
					-- max
				}
			}
			
			if( this.normal_direction && min < max - 1 ) {
				const rect = kids[min].view_rect()
				if( rect && rect.bottom < -ext ) {
					++ min
				}
			}
			
			kids[min].view_rect()
			if( max > 0 ) kids[ max - 1 ].view_rect()
			
			return [ min , max ]
		}

		@ $mol_mem
		gap_top() {
			const skipped = this.sub().slice( 0 , this.view_window()[0] )
			return Math.max( 0 , skipped.reduce( ( sum , view )=> sum + view.approximated_height() , 0 ) )
		}

		@ $mol_mem
		gap_bottom() {
			const skipped = this.sub().slice( this.view_window()[1] )
			return Math.max( 0 , skipped.reduce( ( sum , view )=> sum + view.approximated_height() , 0 ) )
		}

		@ $mol_mem
		sub_visible() {

			var sub = super.sub_visible()

			const next = sub.slice( ... this.view_window() )
			
			if( this.gap_top() ) next.unshift( this.Gap_top() )
			if( this.gap_bottom() ) next.push( this.Gap_bottom() )

			return next
		}
		
		@ $mol_mem
		minimal_height() {
			var height = 0
			var sub = this.sub()
			if( sub ) sub.forEach( ( child : any )=> {
				if( child instanceof $mol_view ) {
					height += child.minimal_height()
				}
			} )
			return height
		}

	}
}
