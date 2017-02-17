namespace $.$mol {
	export class $mol_book extends $.$mol_book {
		
		sub() {
			const pages = this.pages().filter( page => page ).reverse()
			const limit = this.width()

			let width = 0
			for( var visible = 0 ; visible < pages.length ; ++ visible ) {
				width += pages[ visible ].minimal_width()
				if( width > limit ) break
			}
			
			if( visible == 0 ) visible = 1
			
			if( visible === pages.length ) return pages
			
			return [ ... pages.slice( 0 , visible ) , this.Break() , ... pages.slice( visible ) ]
		}
		
		title() {
			return this.pages()[ this.pages().length - 1 ].title()
		}
		
	}
}
