module $ {
	
	export class $mol_state_history< Value > extends $mol_object {
		
		@ $mol_prop()
		static value< Value >( key : string , ...diff : Value[] ) {
			return $mol_state_session.value( `$mol_state_history.id(${this.id()}).${key}` , ...diff )
		}
		
		prefix() { return '' }
		
		value( key : string , ...diff : Value[] ) {
			return $mol_state_local.value( this.prefix() + '.' + key , ...diff )
		}
		
		@ $mol_prop()
		static id( ...diff : void[] ) {
			if( history.state ) return history.state
			var id = Date.now().toString( 16 )
			history.replaceState( id , document.title , document.location.href )
			return id
		}
		
	}
	
}
