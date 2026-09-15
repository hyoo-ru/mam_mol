namespace $.$$ {
	export class $mol_locale_render extends $.$mol_locale_render {
		
		protected locale() { return this.$.$mol_locale }
		override lang() { return this.locale().lang() }
		override direction() { return this.locale().direction() }
	}
}
