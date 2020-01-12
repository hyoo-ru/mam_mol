namespace $.$$ {
	export class $mol_list_demo extends $.$mol_list_demo {
		
		root_rows() {
			return this.row_content( [] )
		}
		
		@ $mol_mem_key
		row_title( id : number[] ) {
			$mol_mem_persist()
			return `Node ${ id.join( '.' ) }: ${ $mol_stub_message( 512 ) } `
		}

		@ $mol_mem_key
		row_content( id : number[] ) {
			$mol_mem_persist()
			return [ ... $mol_range2( index => this.Row([ ... id , index ]) , ()=> Math.floor( Math.random() * 10 + 5 ) ) ]
		}

		@ $mol_mem_key
		row_expanded( id : number[] , next = id.length < 3 ) {
			return next
		}

	}
}
