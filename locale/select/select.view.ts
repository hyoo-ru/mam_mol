namespace $.$$ {
	export class $mol_locale_select extends $.$mol_locale_select {
		
		override value( next?: string ) {
			return this.$.$mol_locale.lang( next )
		}

		@ $mol_mem
		override dictionary(next?: Record<string, string>) {
			return next ?? Object.fromEntries(this.langs().map(code => [ code, code ]))
		}
		
	}
}
