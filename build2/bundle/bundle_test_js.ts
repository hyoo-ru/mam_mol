namespace $ {

	export class $mol_build2_bundle_test_js extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()

			const prefix = slice.prefix()
			const pack = slice.pack()
			const output = pack.output()
			const root_dir = this.root().dir()
			
			const target = output.resolve( `${prefix}.js` )
			const targetMap = output.resolve( `${prefix}.js.map` )
			
			const concater = new this.$.$mol_sourcemap_builder( target.name(), ';' )
			concater.add( '"use strict"' )
			
			const prod = prefix === 'node.test'
				? pack.slice( this.$.$mol_build2_package_slice_node_prod )
				: pack.slice( this.$.$mol_build2_package_slice_web_prod )
			
			const prod_all_files = [ ...prod.files() ]
			const prod_files = prod_all_files.filter( file => /\.[j]sx?$/.test( file.name() ) )
			const prod_paths = new Set( prod_files.map( file => file.path() ) )
			const slice_all_files = [ ...slice.files() ]
			const all_files = slice_all_files.filter( file => /\.[j]sx?$/.test( file.name() ) )
			
			let files = all_files.filter( file => !prod_paths.has( file.path() ) )
			
			if( prefix === 'node.test' ) {
				files = [ ...prod_files, ...files ]
			} else {
				concater.add( 'function require'+'( path ){ return $node[ path ] }' )
			}
			concater.add( this.js_bootstrap(), 'mam.jam.js' )
			files = files.filter( file => file.relate( root_dir ) !== 'mam.jam.js' )

			const boot_rank = ( file: $mol_file2 )=> {
				switch( file.relate( root_dir ) ) {
					case 'mol/test/test.web.test.ts.js': return -2
					case 'mol/test/test.node.test.ts.js': return -2
					case 'mol/test/test.test.ts.js': return -1
				}
				return 0
			}
			files = files
				.map( ( file, index )=> ({ file, index, rank: boot_rank( file ) }) )
				.sort( ( left, right )=> ( left.rank - right.rank ) || ( left.index - right.index ) )
				.map( item => item.file )

			if( all_files.length === 0 ) return []
			
			const errors = [] as Error[]

			for( const file of files ) {
				if( prefix === 'node.test' && /node_modules\//.test( file.relate( root_dir ) ) ) continue

				try {
					this.module_add( concater, file, output )
				} catch( error ) {
					if( $mol_fail_catch( error ) ) errors.push( error as Error )
				}
			}
			
			target.text( concater.content + '\n//# sourceMappingURL=' + targetMap.relate( output ) + '\n' )
			targetMap.text( JSON.stringify( concater.sourcemap ) )
			
			this.log( target, Date.now() - start )
			
			if( errors.length ) {
				$mol_fail_hidden( new $mol_error_mix( `Build fail ${ pack.dir().relate( root_dir ) }`, {}, ...errors ) )
			}

			if( prefix === 'node.test' ) {
				const res = $node['child_process'].spawnSync(
					process.execPath,
					[ '--enable-source-maps', '--trace-uncaught', target.relate( root_dir ) ],
					{ cwd: root_dir.path(), stdio: 'inherit' },
				)
				if( res.error || res.status ) throw res.error ?? new Error( 'Test failed' )
			}
			
			return [ target, targetMap ]
		}

	}

}
