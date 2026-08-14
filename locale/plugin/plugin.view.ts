namespace $.$$ {
	export class $mol_locale_plugin extends $.$mol_locale_plugin {
		
		@ $mol_mem
		override auto() {
			const locale = this.$.$mol_static.$mol_locale
			const doc = this.$.$mol_dom_context.document.documentElement

			doc.lang = locale.lang()
			doc.dir = locale.direction()

			return null
		}
		
	}
}
