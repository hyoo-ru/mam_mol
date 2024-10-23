namespace $ {
	export class $mol_build_ensure_npm extends $mol_build_ensure {
		@ $mol_mem_key
		override ensure( path : string ) {
			const mod = this.$.$mol_file.absolute( path )
			const parent = mod.parent()
			const node = this.root().resolve( 'node' )
			const node_modules = this.root().resolve( 'node_modules' )
			
			if(
				[ node, node_modules ].includes( parent )
				&& mod.name() !== 'node'
				&& ! mod.name().startsWith('@')
			) {
				$node [ mod.name() ] // force autoinstall through npm
				return true
			}
			
			if(
				[ node, node_modules ].includes( parent.parent() )
				&& parent.name().startsWith('@')
			) {
				$node [ `${parent.name()}/${mod.name()}` ] // force autoinstall through npm
				return true
			}
			return false
		}

	}
}

