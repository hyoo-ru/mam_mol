namespace $ {

	const data_url_prefix = 'data:application/json,'
	const prefix = $mol_sourcemap_url_prefix + data_url_prefix
	const end_comment = ' */'

	export function $mol_sourcemap_dataurl_decode(this: $, data: string) {
		const index = data.lastIndexOf(prefix)

		if (index === -1) return undefined

		data = data.substring(index + prefix.length)

		if (data.endsWith(end_comment)) data = data.substring(0, data.length - end_comment.length)

		const decoded = this.decodeURIComponent(data)

		try {
			const map = JSON.parse(decoded) as $mol_sourcemap_raw | null

			if (! map) return undefined

			if (typeof map.mappings === 'string' && map.mappings.startsWith(';;')) {
				map.mappings = map.mappings.substring(2)
			}

			return map
		} catch (e) {
			if (e instanceof Error) e.message += ', origin=' + decoded
			$mol_fail_hidden(e)
		}
	}

	export function $mol_sourcemap_dataurl_encode(this: $, map: $mol_sourcemap_raw, type = 'js' as 'js' | 'css') {
		const str = JSON.stringify( { ...map, mappings: ';;' + map.mappings } )

		return this.$mol_sourcemap_url(data_url_prefix + this.encodeURIComponent( str ), type)
	}
}
