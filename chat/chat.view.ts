namespace $.$$ {

	export class $mol_chat extends $.$mol_chat {
		
		opened() {
			return this.$.$mol_state_arg.value( 'mol_chat' ) !== null
		}
		
		pages() {
			return this.opened() ? [ this.Page() ] : []
		}

		@ $mol_mem
		external() {
			const seed = this.seed() || this.$.$mol_dom_context.location.host
			return `https://talks.hyoo.ru/#!chat=${ encodeURIComponent( seed ) }`
		}
		
		@ $mol_mem
		embed() {
			const lights = this.$.$mol_lights() ? 'on' : 'off'
			const embed = this.$.$mol_state_arg.href()
			return `${ this.external() }/embed=${ encodeURIComponent( embed ) }/mol_lights=${ lights }`
		}
		
	}

}
