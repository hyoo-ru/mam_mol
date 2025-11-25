namespace $ {
	export class $mol_build_ensure_npm extends $mol_object implements $mol_build_ensure_plugin {
		root() { return $mol_file.absolute('') }

		@ $mol_mem_key
		ensure( path : string ) {
			const mod = this.$.$mol_file.absolute( path )
			const parent = mod.parent()
			const node = this.root().resolve( 'node' )
			const node_modules = this.root().resolve( 'node_modules' )
			const name = mod.name()

			if(
				[ node, node_modules ].includes( parent )
				&& ! name.match(/^(@|node:)/)
			) {
				$node [ name ] // force autoinstall through npm
				return true
			}
			
			if(
				[ node, node_modules ].includes( parent.parent() )
				&& parent.name().startsWith('@')
			) {
				$node [ `${parent.name()}/${name}` ] // force autoinstall through npm
				return true
			}
			return false
		}

	}
}

