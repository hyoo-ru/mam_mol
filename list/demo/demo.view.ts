namespace $.$$ {
	export class $mol_list_demo extends $.$mol_list_demo {
		
		root_rows() {
			return this.row_content( '' )
		}
		
		@ $mol_mem_key
		row_title( id : string ) {
			return `Row${ id }: ${ $mol_stub_message( 512 ) } `
		}

		@ $mol_mem_key
		row_content( id : string ) {
			return [ ... $mol_range2( index => this.Row( id + '.' + index ) , ()=> Math.floor( Math.random() * 10 + 5 ) ) ]
		}

		@ $mol_mem_key
		row_expanded( id : string , next = id.length < 5 ) {
			return next
		}

	}
}
