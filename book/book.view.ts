namespace $.$mol {
	export class $mol_book extends $.$mol_book {
		
		visible_pages() {
			const pages = this.pages().slice().reverse()
			const book_width = this.width()
			let pages_width = 0
			let visible_pages : $mol_view[] = []
			let i = 0
			
			for( let page of pages ) {
				if( page == null ) continue
				
				const page_width = page.minimal_width()
				
				if( ( pages_width + page_width ) >= book_width && i > 0) break
				
				pages_width += page.minimal_width()
				visible_pages.push( page )
				
				i++
			}
			
			return visible_pages.reverse()
		}
		
		title() {
			return this.visible_pages()[ this.visible_pages().length - 1 ].title()
		}
		
	}
}
