namespace $.$$ {
	export class $mol_locale_plugin extends $.$mol_locale_plugin {
		
		protected locale() { return this.$.$mol_locale }
		override lang() { return this.locale().lang() }
		override direction() { return this.locale().direction() }
	}
}
