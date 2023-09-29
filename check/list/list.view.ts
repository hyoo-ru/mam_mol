namespace $.$$ {
	
	/**
	 * List of checkboxes
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_list_demo
	 */
	export class $mol_check_list extends $.$mol_check_list {

		options() : { [ key : string ] : string } {
			return {}
		}

		override options_checked(next?: Record<string, boolean>) {
			return next ?? {}
		}

		override option_checked(id: string, next?: boolean | null) {
			const prev = this.options_checked()
			if (next === undefined) return prev[id]

			const next_rec = { ... prev, [id]: next } as Record<string, boolean>
			if (next === null) delete next_rec[id]

			return this.options_checked(next_rec)[id]
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
