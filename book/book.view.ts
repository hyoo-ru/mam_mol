namespace $.$$ {

	export class $mol_book extends $.$mol_book {
		
		@ $mol_mem
		pages_extended() : $mol_view[] {
			return [ this.Placeholder() ].concat( this.pages() )
		}
		
		@ $mol_mem
		break_point() {
			const pages = this.pages_extended()
			const limit = this.width()

			let width = 0
			for( var break_point = pages.length ; break_point > 0 ; -- break_point ) {
				const page = pages[ break_point - 1 ]
				if( !page ) continue

				const page_width = page.minimal_width()
				if( width + page_width > limit ) break
				width += page_width
			}
			if( width === 0 ) -- break_point
			
			return break_point
		}
		
		page( index : number ) {
			return this.pages_extended()[ index ]
		}
		
		page_visible( index : number ) {
			return index >= this.break_point()
		}
		
		@ $mol_mem
		pages_wrapped() {
			const pages = this.pages_extended()
			const extended = [] as typeof pages

			for( let i = 1 ; i < pages.length ; ++i ) {
				if( pages[ i ] ) extended.push( this.Page( i ) )
			}
			if( pages[ 0 ] ) extended.push( this.Page( 0 ) )

			return extended
		}
		
		title() {
			const pages = this.pages()
			return pages[ pages.length - 1 ].title()
		}

		event_front_up( event? : Event ) {
			if( !event ) return
			if( event.defaultPrevented ) return
			this.page(1).focused( true )
		}
		
		event_front_down( event? : Event ) {
			if( !event ) return
			if( event.defaultPrevented ) return
			this.page(1).focused( false )
		}
		
	}

}
