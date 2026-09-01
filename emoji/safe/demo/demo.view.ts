namespace $.$$ {
	export class $mol_emoji_safe_demo extends $.$mol_emoji_safe_demo {
		
		@ $mol_mem
		data() {
			return this.$.$mol_emoji_safe()
		}
		
		@ $mol_mem
		groups() {
			return Object.keys( this.data() )
				.filter( group => this.emojis( group ).length )
				.map( id => this.Group( id ) )
		}
		
		group_title( group: string ) {
			return group
		}
		
		@ $mol_mem_key
		emojis( group: string ) {
			const filter = this.filter()
			return Object.entries( this.data()[ group ] )
				.filter( $mol_match_text( filter, ([ emoji, hints ])=> [ group, emoji, ... hints ] ) )
				.map( ([ emoji ])=> this.Emoji([ group, emoji ]) )
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
