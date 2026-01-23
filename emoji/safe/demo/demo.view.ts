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
			return Object.keys( this.data()[ group ] ).map( emoji => this.Emoji([ group, emoji ]) )
		}
		
		@ $mol_mem_key
		group_emoji_text( group: string ) {
			return Object.keys( this.data()[ group ] ).join( '' )
		}
		
		emoji( [ group, emoji ]: [ string, string ] ) {
			return emoji
		}
		
		emoji_hint( [ group, emoji ]: [ string, string ] ) {
			return this.data()[ group ][ emoji ].join( '\n' )
		}
		
	}
}
