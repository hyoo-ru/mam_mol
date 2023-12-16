namespace $ {

	export const $mol_sourcemap_url_prefix = '# sourceMappingURL='

	export function $mol_sourcemap_url(this: $, uri: string, type = 'js' as 'js' | 'css') {
		if (type === 'css') return `\n/*${$mol_sourcemap_url_prefix}${uri}*/`
		return `\n//${$mol_sourcemap_url_prefix}${uri}`
	}

}
