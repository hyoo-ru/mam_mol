namespace $ {

	export class $mol_build2_root_ensure_npm extends $mol_object2 implements $mol_build2_root_ensure_plugin {

		root(): $mol_build2_root {
			return $mol_fail( new Error( 'root is not set' ) )
		}

		@ $mol_mem_key
		ensure( path: string ) {

			const mod = this.$.$mol_file2.absolute( path )
			const parent = mod.parent()
			const node = this.root().dir().resolve( 'node' )
			const node_modules = this.root().dir().resolve( 'node_modules' )

			if(
				[ node, node_modules ].includes( parent )
				&& mod.name() !== 'node'
				&& !mod.name().startsWith( '@' )
			) {
				this.$.$node_autoinstall( mod.name() )
				return true
			}

			if(
				[ node, node_modules ].includes( parent.parent() )
				&& parent.name().startsWith( '@' )
			) {
				this.$.$node_autoinstall( `${ parent.name() }/${ mod.name() }` )
				return true
			}

			return false
		}

	}

}
