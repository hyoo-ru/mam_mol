namespace $.$$ {
	export class $mol_list_demo_table extends $.$mol_list_demo_table {
		
		@ $mol_mem
		rows() {
			$mol_mem_persist()
			return [ ... $mol_range2( index => this.Row( index ) , ()=> this.count() ) ]
		}

		row_id( id : number ) {
			return String( id )
		}

		@ $mol_mem_key
		row_title( id : number ) {
			$mol_mem_persist()
			return $mol_stub_product_name()
		}

		@ $mol_mem_key
		row_number( id : number , next? : number ) {
			$mol_mem_persist()
			return next ?? id+1
		}

		@ $mol_mem_key
		row_uri( id : number ) {
			$mol_mem_persist()
			return `http://xkcd.com/${ this.row_number( id ) }`
		}

		@ $mol_mem_key
		row_moment( id : number , next? : $mol_time_moment ) {
			$mol_mem_persist()
			return next ?? new $mol_time_moment().shift({ day : this.row_number( id ) })
		}

	}
}
