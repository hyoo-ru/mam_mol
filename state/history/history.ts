namespace $ {
	
	export class $mol_state_history< Value > extends $mol_object {
		
		@ $mol_mem_key()
		static value< Value >( key : string , next? : Value , prev? : Value ) {
			return $mol_state_session.value( `$mol_state_history.id(${this.id()}).${key}` , next , prev )
		}
		
		prefix() { return '' }
		
		value( key : string , next? : Value , prev? : Value ) {
			return $mol_state_local.value( this.prefix() + '.' + key , next , prev )
		}
		
		@ $mol_mem()
		static id( next? : string , prev? : string ) {
			if( history.state ) return <string> history.state
			var id = Date.now().toString( 16 )
			history.replaceState( id , document.title , document.location.href )
			return id
		}
		
	}
	
}
