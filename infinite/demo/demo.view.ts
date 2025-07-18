namespace $.$$ {
	
	export class $mol_infinite_demo extends $.$mol_infinite_demo {
		
		// @ $mol_mem_key
		// before( anchor_id: number | null ) {
		// 	this.$.$mol_wait_timeout( 10000 )
		// 	return Array.from(
		// 		{ length: this.chunk_size() },
		// 		( _, index )=> ( anchor_id ?? 0 ) - index - 1,
		// 	).reverse()
		// }
		
		@ $mol_mem_key
		after( anchor_id: number | null ) {
			this.$.$mol_wait_timeout( 500 )
			return Array.from(
				{ length: this.chunk_size() },
				( _, index )=> ( anchor_id ?? 0 ) + index + 1,
			)
		}
		
		id( index: number ) {
			return String( index )
		}
		
		@ $mol_mem_key
		name( index: number ) {
			$mol_wire_solid()
			return $mol_stub_person_name()
		}
		
		@ $mol_mem_key
		city( index: number ) {
			$mol_wire_solid()
			return $mol_stub_city()
		}

	}

}
