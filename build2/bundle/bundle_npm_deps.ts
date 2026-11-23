namespace $ {

	export class $mol_build2_bundle_npm_deps extends $mol_build2_bundle {

		version( slice: $mol_build2_package_slice, dep: string ) {
			const json = slice.npm_package( dep )
			if( !json.exists() ) return '*'
			const version = JSON.parse( json.text() ).version
			return version ? `^${ version }` : '*'
		}

		npm_names( slice: $mol_build2_package_slice ) {
			return slice.node_deps().filter( dep => !$node_internal_check( dep ) && dep !== 'internal' ).sort()
		}

		@ $mol_mem_key
		pack_artifacts( pack: $mol_build2_package ) {

			const dir = pack.dir()
			if( !dir.resolve( 'index.html' ).exists() ) return []

			const web = pack.slice( this.$.$mol_build2_package_slice_web_prod )
			const node = pack.slice( this.$.$mol_build2_package_slice_node_test )

			const deps = this.npm_names( web )
			const dev = this.npm_names( node ).filter( dep => !deps.includes( dep ) )

			const target = dir.resolve( 'package.json' )
			if( !deps.length && !dev.length && !target.exists() ) return []

			const json = target.exists() ? JSON.parse( target.text() ) : {}

			const dependencies = { ... json.dependencies } as Record< string, string >
			const devDependencies = { ... json.devDependencies } as Record< string, string >
			const scripts = { ... json.scripts } as Record< string, string >

			let changed = false

			for( const dep of deps ) {
				if( dependencies[ dep ] ) continue
				dependencies[ dep ] = this.version( web, dep )
				changed = true
			}

			for( const dep of dev ) {
				if( dependencies[ dep ] || devDependencies[ dep ] ) continue
				devDependencies[ dep ] = this.version( node, dep )
				changed = true
			}

			if( !scripts.start ) {
				const path = dir.relate( this.root().dir() )
				const builder = 'mol/build2/start'
				scripts.start = `cd ${ path.split( '/' ).map( ()=> '..' ).join( '/' ) } && npx mam ${ builder } && node ${ builder }/-/node.js ${ path }`
				changed = true
			}

			if( !changed ) return []

			const start = Date.now()
			target.text( JSON.stringify( { ... json, scripts, dependencies, devDependencies }, null, '\t' ) + '\n' )
			this.log( target, Date.now() - start )

			return []
		}

	}

}
