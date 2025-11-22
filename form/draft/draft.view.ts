namespace $.$$ {

	type Model = Record<string, (next?: $mol_form_draft_state_value | null) => $mol_form_draft_state_value>

	function norm_string(val: unknown) {
		return String(val ?? '')
	}

	function norm_number(val: unknown) {
		return Number(val ?? 0)
	}

	function norm_bool(val: unknown) {
		return Boolean(val ?? false)
	}

	function normalize_val(prev: $mol_form_draft_state_value, next: $mol_form_draft_state_value | null) {
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
		override list_string( field: string, next? : readonly string[] | null ) {
			return this.value( field, next )?.map(norm_string) ?? []
		}

		@ $mol_mem_key
		override dictionary_bool( field: string, next? : Record<string, boolean> | null ): Record<string, boolean> {
			if (next) {
				const prev = this.model_pick(field) as Record<string, boolean>
				const normalized = {} as typeof next
				for (const key in next) {
					if (next[key] || key in prev ) normalized[key] = next[key]
				}

				return this.value( field, normalized ) ?? {}
			}

			return this.value( field ) ?? {}
		}

		@ $mol_mem_key
		override value_str( field: string, next? : string | null ) {
			return norm_string( this.value( field, next ) )
		}
		
		@ $mol_mem_key
		override value_number( field: string, next? : number | null ) {
			return norm_number( this.value( field, next ) )
		}
		
		@ $mol_mem_key
		override value_bool( field: string, next? : boolean | null ) {
			return norm_bool( this.value( field, next ) )
		}

		override model_pick(field: string, next?: $mol_form_draft_state_value | null) {
			return (this.model() as unknown as Model)[field](next)
		}

		override state_pick(field: string, next?: $mol_form_draft_state_value | null) {
			return this.state( next === undefined ? next : { ... this.state(), [ field ]: next } )[ field ]
		}

		@ $mol_mem_key
		override value<T extends $mol_form_draft_state_value>( field: string, next?: T | null ): T {
			if (Array.isArray(next) && next.length === 0 && ! this.model_pick(field)) next = null
			return this.state_pick(field, next) as T ?? this.model_pick(field)
		}

		@ $mol_mem_key
		override value_changed(field: string): boolean {
			const prev = $mol_wire_probe(() => this.value_changed(field))

			try {
				const next = this.state_pick(field)
				const prev = this.model_pick(field)
				const next_norm = normalize_val(prev, next)
	
				return ! $mol_compare_deep(next_norm, prev)
			} catch (e) {
				$mol_fail_log(e)
				return prev ?? false
			}
		}
		
		@ $mol_mem
		override state( next?: $mol_form_draft_state ) {
			return this.$.$mol_state_local.value( `${ this }.state()`, next ) ?? {}
		}
		
		@ $mol_mem
		override changed() {
			return Object.keys(this.state()).some(field => this.value_changed(field))
		}

		override reset(next?: unknown) {
			this.state(null)
		}

		@ $mol_mem
		override result( next?: string | Error ) {
			this.state()
			if (next instanceof Error) next = this.errors()[next.message] || next.message || this.form_invalid()

			return next ?? ''
		}
		
		@ $mol_mem
		override buttons() {
			return [
				this.Submit(),
				... this.changed() ? [ this.Reset() ] : [],
				... this.result() ? [ this.Result() ] : [],
			]
		}

		@ $mol_action
		override save(next?: Event) {
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
			this.done(next)

			return null
		}

	}
}
