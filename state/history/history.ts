namespace $ {
	
	export class $mol_state_history< Value > extends $mol_object {
		
		@ $mol_mem
		static data( next?: {} | null ) {
			
			const prev = history.state || {}
			if( !next ) return prev
			
			history.replaceState( next, $mol_dom_context.document.title, $mol_dom_context.document.location.href )
			
			return next
		}
		
		@ $mol_mem_key
		static value< Value >( key : string , next? : Value ) {
			
			const prev = this.data()
			if( next === undefined ) return prev[ key ] ?? null
			
			const state = { ... prev, [ key ]: next }
			this.data( state )
			
			return state[ key ] ?? null
		}
		
		prefix() { return '' }
		
		value( key : string , next? : Value ) {
			return $mol_state_local.value( this.prefix() + '.' + key , next )
		}
		
	}
	
}
