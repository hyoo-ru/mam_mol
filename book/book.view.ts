namespace $.$mol {
	export class $mol_book extends $.$mol_book {
		
		sub() {
			return this.pages().map( ( page, i ) => this.Paper( i ) )
		}
		
		page_content( index: number ) {
			return this.pages()[ index ]
		}
		
	}
}
