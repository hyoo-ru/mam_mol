namespace $ {

	export class $mol_build2_demo_plugin_md extends $mol_build2_convert {

		static match( file: $mol_file2 ) {
			return /\.text\.md$/.test( file.name() )
		}

		@ $mol_mem
		generated_sources() {
			const source = this.source()
			const name = '$' + source.parent().relate( this.root().dir() ).replace( /\//g, '_' ) + '_' + source.name().replace( /\.text\.md$/, '' )
			const script = source.parent().resolve( `-md/${ source.name() }.ts` )
			script.text( `namespace $ { export const ${ name } = ${ JSON.stringify( source.text() ) } }\n` )
			return [ script ]
		}

	}

	$mol_build2_root.plugin( $mol_build2_demo_plugin_md )

}
