namespace $.$$ {
	export class $mol_emoji_safe_demo extends $.$mol_emoji_safe_demo {
		
		@ $mol_mem
		data() {
			return this.$.$mol_emoji_safe()
		}
		
		@ $mol_mem
		groups() {
			return Object.keys( this.data() ).map( id => this.Group( id ) )
		}
		
		group_title( group: string ) {
			return group
		}
		
		@ $mol_mem_key
		emojis( group: string ) {
			return Object.keys( this.data()[ group ] ).map( id => this.Emoji( id ) )
		}
		
		emoji( emoji: string ) {
			return emoji
		}
		
	}
}
