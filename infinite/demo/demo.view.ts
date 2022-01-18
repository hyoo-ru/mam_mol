namespace $.$$ {
	
	export class $mol_infinite_demo extends $.$mol_infinite_demo {
		
		@ $mol_action
		after( anchor_id = 0 ) {
			return [ ... $mol_range2(
				index => anchor_id + index ,
				()=> this.chunk_size() 
			) ]
		}

		item_title( id : number ) {
			return `Row #${id}`
		}
		
	}

}
