namespace $ {

	export function $mol_tree2_text_to_file( this: $, text: $mol_tree2, pathname: string ) {
		const map = this.$mol_file.absolute(pathname + '.map')
		const map_data = JSON.stringify( this.$mol_tree2_text_to_sourcemap( text ) )
		map.text(map_data)

		const src = this.$mol_file.absolute(pathname)
		const src_data = this.$mol_tree2_text_to_string( text ) + this.$mol_sourcemap_url(map.name())
		src.text( src_data )

		return { src, map }
	}

}
