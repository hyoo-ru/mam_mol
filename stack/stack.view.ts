namespace $.$mol {
	export class $mol_stack extends $.$mol_stack {

		side( next? : boolean ) {
			if( !this.main() ) return true
			if( this.main().length === 0 ) return true
			
			const arg = ( next === void 0 ) ? void 0 : next ? '' : null
			return $mol_state_arg.value( this.state_key( 'side' ) , arg ) != null
		}

	}
}
