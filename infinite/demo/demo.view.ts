namespace $.$$ {
	
	export class $mol_infinite_demo extends $.$mol_infinite_demo {
		
		@ $mol_action
		after( anchor_id = 0 ) {
			return Array.from(
				{ length: this.chunk_size() },
				( _, index )=> anchor_id + index,
			)
		}

	}

}
