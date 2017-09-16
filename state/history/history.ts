namespace $ {
	
	export class $mol_state_history< Value > extends $mol_object {
		
		@ $mol_mem_key
		static value< Value >( key : string , next? : Value ) {
			return $mol_state_session.value( `$mol_state_history:id(${this.id()}):${key}` , next )
		}
		
		prefix() { return '' }
		
		value( key : string , next? : Value ) {
			return $mol_state_local.value( this.prefix() + '.' + key , next )
		}
		
		@ $mol_mem
		static id( next? : string ) {
			try {
				if( history.state ) return history.state as string
			} catch( error ) {
				// IE11
			}
			const id = Date.now().toString( 16 )
			history.replaceState( id , $mol_dom_context.document.title , $mol_dom_context.document.location.href )
			return id
		}
		
	}
	
}
