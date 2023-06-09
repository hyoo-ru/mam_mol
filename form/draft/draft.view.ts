namespace $.$$ {

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_form_draft_demo
	 */
	export class $mol_form_draft extends $.$mol_form_draft {
		
		@ $mol_mem_key
		value_str( field: string, next? : string | null ) {
			return String( this.value( field, next ) ?? '' )
		}
		
		@ $mol_mem_key
		value_numb( field: string, next? : boolean | null ) {
			return Number( this.value( field, next ) ?? 0 )
		}
		
		@ $mol_mem_key
		value_bool( field: string, next? : boolean | null ) {
			return Boolean( this.value( field, next ) ?? false )
		}
		
		@ $mol_mem_key
		value( field: string, next?: string | number | boolean | null ) {
			return this.state( next?.valueOf && { ... this.state(), [ field ]: next } )[ field ]
				?? ( this.model() as any )[ field ]()
		}
		
		@ $mol_mem
		state( next?: Record< string, string | number | boolean | null > | null ) {
			return $mol_state_local.value( `${ this }.state()`, next ) ?? {}
		}
		
		@ $mol_mem
		changed() {
			return Object.keys( this.state() ).length > 0
		}
		
		submit_allowed() {
			return this.changed() && super.submit_allowed()
		}
		
		@ $mol_action
		submit( next? : Event ) {
			
			const model = this.model()
			
			for( let [ field, next ] of Object.entries( this.state() ) ) {
				const prev = ( model as any )[ field ]()
				switch( typeof prev ) {
					case 'boolean': next = String( next ) === 'true'; break
					case 'number': next = Number( next ); break
					case 'string': next = String( next ); break
				}
				;( model as any )[ field ]( next )
			}
			
			this.state( null )
			
		}
		
	}
}
