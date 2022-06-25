namespace $ {
	
	export function $mol_text_key( text: string ) {
		text = '\n\n' + text + '\r\r'
		const key = new Map< string, number >()
		for( let i = 0; i < text.length - 2; ++ i ) {
			const trigram = text.slice( i, i + 3 )
			const count = key.get( trigram ) ?? 0
			key.set( trigram, count + 1 )
		}
		return key
	}
	
}
