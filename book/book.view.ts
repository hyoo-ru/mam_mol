namespace $.$mol {
	export class $mol_book extends $.$mol_book {
		
		@ $mol_mem()
		break_point() {
			const pages = this.pages().filter( page => page )
			const limit = this.width()

			let width = 0
			for( var break_point = pages.length ; break_point > 0 ; -- break_point ) {
				width += pages[ break_point - 1 ].minimal_width()
				if( width > limit ) break
			}
			if( break_point === pages.length ) -- break_point
			
			return break_point
		}
		
		page( index : number ) {
			return this.pages()[ index ]
		}
		
		page_visible( index : number ) {
			return index >= this.break_point()
		}
		
		pages_extended() {
			return this.pages().map( ( page , index )=> this.Page( index ) )
		}
		
		title() {
			return this.pages()[ this.pages().length - 1 ].title()
		}
		
	}
}
