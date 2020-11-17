namespace $.$$ {
	export class $mol_text_code extends $.$mol_text_code {
		
		@ $mol_mem
		text_lines() {
			return this.text().split( '\n' ) as readonly string[]
		}
		
		@ $mol_mem
		rows() {
			return this.text_lines().map( ( _ , index )=> this.Row( index ) )
		}

		@ $mol_mem_key
		row_text( index: number ) {
			return this.text_lines()[ index ]
		}
		
	}
}
