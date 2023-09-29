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

	function normalize_val(prev: Value, next: Value | null) {
		switch( typeof prev ) {
			case 'boolean': return String( next ) === 'true'
			case 'number': return Number( next )
			case 'string': return String( next )
		}

		return next
	}

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_form_draft_demo
	 */
	export class $mol_form_draft extends $.$mol_form_draft {
		@ $mol_mem_key
		list_string( field: string, next? : readonly string[] | null ) {
			return this.value( field, next )?.map(norm_string) ?? []
		}

		@ $mol_mem_key
		value_rec_bool( field: string, next? : Record<string, boolean> | null ) {
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

		model_pick(field: string, next?: Value | null) {
			return (this.model() as unknown as Model)[field](next)
		}

		state_pick(field: string, next?: Value | null) {
			return this.state( next === undefined ? next : { ... this.state(), [ field ]: next } )[ field ]
		}

		@ $mol_mem_key
		value<T extends Value>( field: string, next?: T | null ): T {
			return this.state_pick(field, next) as T ?? this.model_pick(field)
		}

		@ $mol_mem_key
		value_changed(field: string) {
			return ! $mol_compare_deep(this.state_pick(field), this.model_pick(field))
		}
		
		@ $mol_mem
		state( next?: Record< string, Value | null > | null ) {
			return $mol_state_local.value( `${ this }.state()`, next ) ?? {}
		}
		
		@ $mol_mem
		changed() {
			return Object.keys(this.state()).some(field => this.value_changed(field))
		}
		
		submit_allowed() {
			return this.changed() && super.submit_allowed()
		}

		reset() {
			this.state(null)
		}

		@ $mol_action
		submit( next? : Event ) {
			
			const tasks = Object.entries( this.state() ).map(
				([ field, next ]) => () => {
					const prev = this.model_pick(field)

					return {
						field,
						next: normalize_val(prev, next)
					}
				}
			)

			const normalized = $mol_wire_race(...tasks)

			$mol_wire_race(...normalized.map(({ field, next }) => () => this.model_pick( field, next )))
			
			this.reset()
			
		}
		
	}
}
