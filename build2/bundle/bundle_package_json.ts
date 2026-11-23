namespace $ {

	export class $mol_build2_bundle_package_json extends $mol_build2_bundle {
		
		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()

			const pack = slice.pack()
			const root_dir = slice.root().dir()

			const source = pack.dir().resolve( `package.json` )
			const target = pack.output().resolve( `package.json` )

			let name = pack.dir().relate( root_dir ).replace( /\//g, '_' )
			
			let json = {
				name,
				version: '0.0.0',
				exports: {
					node: {
						import: './node.mjs',
						default: './node.js'
					},
					types: './web.d.ts',
					import: './web.mjs',
					default: './web.js'
				},
				main: './web.js',
				module: './web.mjs',
				browser: './web.js',
				types: './web.d.ts',
				keywords: [] as string[],
				dependencies: {} as { [ key: string ]: string }
			}

			if( source.exists() ) {
				Object.assign( json, JSON.parse( source.text() ) )
			}

			let version = json.version.split('.').map( Number )
			name = json.name || name
			
			try {

				const versions = JSON.parse(
					this.$.$mol_exec( '', 'npm', 'view', name, 'versions', '--json' ).stdout.toString()
				)
				const published = ( Array.isArray( versions ) ? versions : [ versions ] )
					.at( -1 )!
					.split( '.' )
					.map( Number )
				
				if( published[0] > version[0] ) {
					version = published
				} else if( published[0] === version[0] && published[1] > version[1] ) {
					version[1] = published[1]
				}
				
				if(!( published[2] <= version[2] )) {
					version[2] = published[2]
				}
				
			} catch {}

			++ version[2]

			json.version = version.join( '.' )

			const node_deps = /node/.test( slice.prefix() ) ? ( slice as $mol_build2_package_slice_node ).node_deps(): []
			for( let dep of node_deps ) {
				if( $node_internal_check( dep ) ) continue
				if( dep === 'internal' ) continue
				json.dependencies[ dep ] = `*`
			}
			
			json.keywords = [ ... slice.graph().nodes ]
				.filter( Boolean )
				.map( file => file.relate( root_dir ) )
				.filter( path => /^[a-z0-9_\/]+$/.test( path ) )
				.filter( path => !/[.-]/.test( path ) )
				.map( path => '$' + path.replaceAll( '/', '_' ) )
			
			target.text( JSON.stringify( json, null, '  ' ) )
			
			this.log( target, Date.now() - start )
			
			return [ target ]
		}

	}
	
}
