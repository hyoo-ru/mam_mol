namespace $.$$ {
	export class $mol_locale_select extends $.$mol_locale_select {
		
		value( next?: string ) {
			return this.$.$mol_locale.lang( next )
		}
		
		dictionary() {
			return this.$.$mol_lang_iso639
		}
		
	}
}
