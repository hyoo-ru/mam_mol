namespace $.$$ {
	export class $mol_list_demo_table extends $.$mol_list_demo_table {
		
		@ $mol_mem
		rows() {
			return $mol_range2(
				index => this.Row( index ),
				()=> this.count(),
			)
		}
		
		@ $mol_mem
		check_list() {
			return Array.from(
				{ length: this.count() },
				(_,i)=> this.Id(i),
			)
		}

		row_id( id: number ) {
			return String( id ).padStart( 5, '0' )
		}

		@ $mol_mem_key
		row_title( id: number ) {
			$mol_wire_solid()
			return $mol_stub_product_name()
		}

		@ $mol_mem_key
		row_quantity(
			id: number,
			next = Math.floor( Math.random() * 100 )
		) {
			$mol_wire_solid()
			return next
		}

		@ $mol_mem_key
		row_status(
			id: number,
			next = $mol_array_lottery( Object.keys( this.status_options() ) )
		) {
			$mol_wire_solid()
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
			$mol_wire_solid()
			return next
		}
		
		@ $mol_mem
		colors() {
			return Object.keys( $mol_colors )
		}
		
		@ $mol_mem_key
		row_color( id: number, next?: string ) {
			$mol_wire_solid()
			return next ?? $mol_array_lottery( this.colors() )
		}

	}
}
