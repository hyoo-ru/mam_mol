namespace $ {

	class $mol_build2_root_test_hello extends $mol_build2_convert {

		static match( file: $mol_file2 ) {
			return /\.hello$/.test( file.name() )
		}

		@ $mol_mem
		generated_sources() {
			const source = this.source()
			const script = source.parent().resolve( `-hello/${ source.name() }.ts` )
			const greeting = JSON.stringify( `Hello, ${ source.text().trim() }` )
			script.text( `namespace $ { export const $${''}mol_build2_fixture_plugin_hello = ${ greeting } }\n` )
			return [ script ]
		}

	}

	$mol_build2_root.plugin( $mol_build2_root_test_hello )

	$mol_test({

		'plugin generates sources for the bundle'() {
			const root = new $mol_build2_root
			const ensure = new $mol_build2_root_ensure
			ensure.ensure = ()=> false
			root.ensure = $mol_const( ensure )
			const pack = root.pack( root.dir().resolve( 'mol/build2/fixture/plugin' ) )
			const script = root.bundle( $mol_build2_bundle_js ).artifacts( pack.slice( $mol_build2_package_slice_node_prod ) ).find( file => file.name() === 'node.js' )
			const context = $node.vm.createContext({ module: {}, require, console, process })
			$node.vm.runInContext( script?.text() ?? '', context )
			$mol_assert_equal( context[ '$' + 'mol_build2_fixture_plugin' ](), 'Hello, World' )
		},

	})

}
