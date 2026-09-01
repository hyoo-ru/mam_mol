namespace $.$$ {

	/**
	 * Button to open embedded chat.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_chat_demo
	 */
	export class $mol_chat extends $.$mol_chat {
		
		opened() {
			return this.$.$mol_state_arg.value( 'mol_chat' ) !== null
		}
		
		pages() {
			return this.opened() ? [ this.Page() ] : []
		}

		@ $mol_mem
		standalone() {
			const seed = this.seed()
			const origin = new URL( this.$.$mol_state_arg.href() ).origin
			return `https://talks.hyoo.ru/#!chat=${ seed }`
		}
		
		@ $mol_mem
		embed() {
			const seed = this.seed()
			const lights = String( this.$.$mol_lights() )
			const embed = this.$.$mol_state_arg.href()
			return `https://talks.hyoo.ru/#!chat=${ encodeURIComponent( seed ) }/mol_lights=${ lights }`
		}
		
	}

}
