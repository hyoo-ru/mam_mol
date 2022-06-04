namespace $.$$ {
	
	export class $mol_infinite_demo extends $.$mol_infinite_demo {
		
		@ $mol_action
		after( anchor_id = 0 ) {
			this.$.$mol_wait_timeout( 1000 )
			return Array.from(
				{ length: this.chunk_size() },
				( _, index )=> anchor_id + index,
			)
		}
		
		@ $mol_mem_key
		photo( index: number ) {
			$mol_wire_solid()
			return $mol_stub_person_avatar()
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
