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
			const seed = this.seed()
			const origin = new URL( this.$.$mol_state_arg.href() ).origin
			return `https://talks.hyoo.ru/#!chat=${ encodeURIComponent( origin + '/' + seed ) }`
		}
		
		@ $mol_mem
		embed() {
			const seed = this.seed()
			const lights = this.$.$mol_lights() ? 'on' : 'off'
			const embed = this.$.$mol_state_arg.href()
			return `https://talks.hyoo.ru/#!chat=${ encodeURIComponent( seed ) }/embed=${ encodeURIComponent( embed ) }/mol_lights=${ lights }`
		}
		
	}

}
