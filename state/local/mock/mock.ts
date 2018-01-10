namespace $ {

	export class $mol_state_local_mock< Value > extends $mol_state_local< Value > {
					
		@ $mol_mem_key
		static value< Value >( key : string , next? : Value ) { return next }

	}

}
