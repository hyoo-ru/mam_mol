namespace $ {

	let cache = null! as Record<
		string /*group*/,
		Record<
			string /*emoji*/,
			readonly string[] /*keywords*/
		>
	>

	export function $mol_emoji_safe( this: $ ) {
		if( cache ) return cache
		const uri = './mol/emoji/safe/safe.json'
		return cache = this.$mol_fetch.json( uri ) as typeof cache
	}
	
}
