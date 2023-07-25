namespace $.$$ {
	export class $mol_list_demo_tree extends $.$mol_list_demo_tree {
		
		root_rows() {
			return this.row_content( [] )
		}
		
		@ $mol_mem_key
		row_title( id : number[] ) {
			$mol_wire_solid()
			return `Node ${ id.join( '.' ) }: ${ $mol_stub_message( 512 ) } `
		}

		@ $mol_mem_key
		row_content( id : number[] ) {
			$mol_wire_solid()
			return [ ... $mol_range2( index => this.Row([ ... id , index ]) , ()=> Math.floor( Math.random() * 10 + 5 ) ) ]
		}

		@ $mol_mem_key
		row_expanded( id : number[] , next = id.length < 4 ) {
			return next
		}

	}
}
