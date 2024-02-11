namespace $ {
	export function $mol_sourcemap_from_file(this: $, src: $mol_file) {
		const text = src.text()
		let map = this.$mol_sourcemap_dataurl_decode(text)
		if (map) return map

		const map_file = src.parent().resolve( src.name() + '.map' )
		if (map_file.exists()) map = JSON.parse(map_file.text())

		return map
	}
}
