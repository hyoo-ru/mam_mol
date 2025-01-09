namespace $ {
	export function $mol_emoji_safe(
		this: $
	): Record<
		string /*group*/,
		Record<
			string /*emoji*/,
			readonly string[] /*keywords*/
		>
	> {
		return this.$mol_fetch.json( './mol/emoji/safe/safe.json' ) as any
	}
}
