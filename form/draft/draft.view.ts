namespace $.$$ {

	type Primitive = string | number | boolean

	type Value = readonly Primitive[] | Primitive | Record<string, boolean>
	type Model = Record<string, (next?: Value | null) => Value>

	function norm_string(val: unknown) {
		return String(val) ?? ''
	}

	function norm_number(val: unknown) {
		return Number(val) ?? 0
	}

	function norm_bool(val: unknown) {
		return Boolean(val) ?? false
	}

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_form_draft_demo
	 */
	export class $mol_form_draft extends $.$mol_form_draft {
		@ $mol_mem_key
		value_arr_str( field: string, next? : readonly string[] | null ) {
			return this.value( field, next )?.map(norm_string) ?? []
		}

		@ $mol_mem_key
		value_rec_str( field: string, next? : Record<string, boolean> | null ) {
			return this.value( field, next ) ?? {}
		}

		@ $mol_mem_key
		value_str( field: string, next? : string | null ) {
			return norm_string( this.value( field, next ) )
		}
		
		@ $mol_mem_key
		value_numb( field: string, next? : boolean | null ) {
			return norm_number( this.value( field, next ) )
		}
		
		@ $mol_mem_key
		value_bool( field: string, next? : boolean | null ) {
			return norm_bool( this.value( field, next ) )
		}
		
		@ $mol_mem_key
		value<T extends Value>( field: string, next?: T | null ) {
			return this.state( next?.valueOf && { ... this.state(), [ field ]: next } )[ field ] as T | undefined
				?? ( this.model() as unknown as Model )[ field ]() as T
		}
		
		@ $mol_mem
		state( next?: Record< string, Value | null > | null ) {
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
			
			const model = this.model() as unknown as Model
			
			for( let [ field, next ] of Object.entries( this.state() ) ) {
				const prev = model[ field ]()
				switch( typeof prev ) {
					case 'boolean': next = String( next ) === 'true'; break
					case 'number': next = Number( next ); break
					case 'string': next = String( next ); break
				}
				model[ field ]( next )
			}
			
			this.state( null )
			
		}
		
	}
}
