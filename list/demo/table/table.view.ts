namespace $.$$ {
	export class $mol_list_demo_table extends $.$mol_list_demo_table {
		
		@ $mol_mem
		rows() {
			return Array.from(
				{ length: this.count() },
				(_,i)=> this.Row(i),
			)
		}

		row_id( id: number ) {
			return id + 1
		}

		@ $mol_mem_key
		row_title( id: number ) {
			return $mol_stub_product_name()
		}

		@ $mol_mem_key
		row_quantity(
			id: number,
			next = Math.floor( Math.random() * 100 )
		) {
			return next
		}

		@ $mol_mem_key
		row_status(
			id: number,
			next = $mol_array_lottery( Object.keys( this.status_options() ) )
		) {
			return next
		}

		@ $mol_mem_key
		row_uri( id: number ) {
			return `http://xkcd.com/${ this.row_id( id ) }`
		}

		@ $mol_mem_key
		row_moment(
			id: number,
			next = new $mol_time_moment().shift({
				day: Math.floor( Math.random() * 100 )
			})
		) {
			return next
		}

	}
}
