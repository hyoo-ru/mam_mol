namespace $ {

	const prefix = '# sourceMappingURL=data:application/json,'
	const end_comment = ' */'

	export function $mol_sourcemap_dataurl_decode(this: $, data: string) {
		const index = data.lastIndexOf(prefix)

		if (index === -1) return undefined

		data = data.substring(index)

		if (data.endsWith(end_comment)) data = data.substring(0, end_comment.length)

		const decoded = this.decodeURIComponent(data)
		const map = JSON.parse(decoded) as $mol_sourcemap_raw | null

		if (! map) return undefined

		if (typeof map.mappings === 'string' && map.mappings.startsWith(';;')) {
			map.mappings = map.mappings.substring(2)
		}

		return map
	}

	export function $mol_sourcemap_dataurl_encode(this: $, map: $mol_sourcemap_raw, type = 'js' as 'js' | 'css') {
		const str = JSON.stringify( { ...map, mappings: ';;' + map.mappings } )
		const encoded = this.encodeURIComponent( str )
		const uri = `${prefix}${encoded}`

		return type === 'js' ? `\n//${uri}` : `\n/*${uri}${end_comment}`
	}
}
