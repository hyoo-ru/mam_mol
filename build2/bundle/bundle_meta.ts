namespace $ {

	export class $mol_build2_bundle_meta extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()

			const prefix = slice.prefix()
			const meta = slice.pack().output().resolve( `${prefix}.meta.json` )
			const deps_json = slice.pack().output().resolve( `${prefix}.deps.json` )
			const graph = slice.graph()
			const files = [ ... slice.files() ]
			const root_dir = this.root().dir()

			const deps_in = {} as Record< string, Record< string, number > >
			for( const [ dep, pair ] of graph.edges_in ) {

				const dep_path = dep.relate()
				if( !deps_in[ dep_path ] ) {
					deps_in[ dep_path ] = {}
				}

				for( const [ mod, edge ] of pair ) {
					const mod_path = mod.relate()
					deps_in[ dep_path ][ mod_path ] = edge.priority
				}

			}

			const deps_out = {} as Record< string, Record< string, number > >
			for( const [ mod, pair ] of graph.edges_out ) {

				const mod_path = mod.relate()
				if( !deps_out[ mod_path ] ) {
					deps_out[ mod_path ] = {}
				}

				for( const [ dep, edge ] of pair ) {
					const dep_path = dep.relate()
					deps_out[ mod_path ][ dep_path ] = edge.priority
				}

			}

			const size = {} as Record< string, number >
			for( const file of files ) {
				size[ file.relate() ] = file.size()
			}

			const sloc = {} as Record< string, number >
			for( const file of files ) {
				if( /\/-/.test( file.path() ) ) continue
				if( !file.exists() ) continue

				const ext = file.name().replace( /^.*\./, '' )
				const count = file.text().trim().split( /[\n\r]\s*/ ).length
				sloc[ ext ] = ( sloc[ ext ] || 0 ) + count
			}

			const deps = {} as Record< string, Record< string, number > >
			for( const file of graph.nodes ) {
				deps[ file.relate( root_dir ) ] = {}
				for( const [ dep, priority ] of slice.file_deps( file ) ) {
					deps[ file.relate( root_dir ) ][ dep.relate( root_dir ) ] = priority
				}
			}

			const json = {
				deps_in,
				deps_out,
				order: files.map( file => file.relate() ),
				size,
				files: files.map( file => file.relate( root_dir ) ),
				mods: [ ... graph.sorted ].map( file => file.relate( root_dir ) ),
				sloc,
				deps,
			}
			
			const text = JSON.stringify( json, null, '\t' )

			meta.text( text )
			deps_json.text( text )

			this.log( meta, Date.now() - start )

			return [ meta, deps_json ]
		}

	}
	
}
