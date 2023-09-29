namespace $.$$ {
	
	/**
	 * List of checkboxes
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_list_demo
	 */
	export class $mol_check_list extends $.$mol_check_list {

		options() : { [ key : string ] : string } {
			return {}
		}

		override dictionary_checked(next?: Record<string, boolean>) {
			return next ?? {}
		}

		override option_checked(id: string, next?: boolean | null) {
			const prev = this.dictionary_checked()
			if (next === undefined) return prev[id] ?? null

			const next_rec = { ... prev, [id]: next } as Record<string, boolean>
			if (next === null) delete next_rec[id]

			return this.dictionary_checked(next_rec)[id] ?? null
		}

		@ $mol_mem
		keys(): readonly string[] {
			return Object.keys( this.options() )
		}

		@ $mol_mem
		items() {
			return this.keys().map( key => this.Option( key ) )
		}
		
		option_title( key : string ) {
			return this.options()[key] || key
		}
		
	}

}
