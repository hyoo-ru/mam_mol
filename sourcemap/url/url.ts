namespace $ {

	export function $mol_sourcemap_url(this: $, uri: string, type = 'js' as 'js' | 'css') {
		if (type === 'css') return `\n/*# sourceMappingURL=${uri}*/`
		return `\n//# sourceMappingURL=${uri}`
	}

}
