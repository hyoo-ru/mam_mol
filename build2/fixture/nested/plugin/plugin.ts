namespace $ {

	export class $mol_build2_fixture_nested_plugin extends $mol_build2_convert {

		static match( file: $mol_file2 ) {
			return /\.nested$/.test( file.name() )
		}

		@ $mol_mem
		generated_sources() {
			const source = this.source()
			const name = '$' + source.parent().relate( this.root().dir() ).replace( /\//g, '_' ) + '_' + source.name().replace( /\.\w+$/, '' )
			const script = source.parent().resolve( `-nested/${ source.name() }.ts` )
			script.text( `namespace $ { export const ${ name } = ${ JSON.stringify( source.text().trim().toUpperCase() ) } }\n` )
			return [ script ]
		}

	}

	$mol_build2_root.plugin( $mol_build2_fixture_nested_plugin )

}
