namespace $ {

	export class $mol_build2_package_slice_build_scan extends $mol_build2_package_slice {

		prefix() {
			return 'node.build'
		}

		plugins(): $mol_build2_plugin[] {
			return [ ... $mol_build2_root.plugins ]
		}

		plugin_scopes(): Map< Function, $mol_file2[] > {
			return new Map< Function, $mol_file2[] >()
		}

		npm_package( name: string ) {
			return this.npm_dir().resolve( `node_modules/${ name }/package.json` )
		}

		@ $mol_mem
		build_files() {
			const files = [] as $mol_file2[]

			for( const dir of this.graph().sorted ) {
				if( dir.type() !== 'dir' ) continue

				for( const file of dir.sub() ) {
					if( file.type() !== 'file' ) continue
					if( /\.build\.tsx?$/.test( file.name() ) ) files.push( file )
				}
			}

			return files
		}

	}

	export class $mol_build2_package_slice_build extends $mol_build2_package_slice_build_scan {

		filter( file: $mol_file2 ) {
			if( /\.(web|test|dev)\./.test( file.name() ) ) return false
			return !this.host().has( this.module( file ).path() )
		}

		module( file: $mol_file2 ) {
			let dir = file.type() === 'dir' ? file : file.parent()
			while( /^-/.test( dir.name() ) ) dir = dir.parent()
			return dir
		}

		@ $mol_mem
		host() {
			const map = this.$.$mol_file2.absolute( $node.path.resolve( process.argv[1] ) + '.map' )
			if( !map.exists() ) $mol_fail( new Error( `Builder sourcemap not found: ${ map.path() }` ) )

			const sources = JSON.parse( map.text() ).sources as string[]
			return new Set( sources.map( source => this.module( map.parent().resolve( source ) ).path() ) )
		}

		file_deps( file: $mol_file2 ) {
			const deps = super.file_deps( file )
			if( file.type() !== 'dir' ) return deps
			return deps.filter( ([ dep ])=> dep !== file.parent() )
		}

		graph_roots() {
			return this.pack().slice( this.$.$mol_build2_package_slice_build_scan ).build_files()
		}

		bundle_classes() {
			return [ this.$.$mol_build2_bundle_js ]
		}

		@ $mol_mem_key
		reach( file: $mol_file2 ) {
			const found = new Set< $mol_file2 >()

			const visit = ( file: $mol_file2 ): void => {
				if( found.has( file ) ) return
				found.add( file )
				for( const[ dep ] of this.file_deps( file ) ) visit( dep )
			}

			visit( file )

			return found
		}

		plugin_module( Plugin: Function ) {
			let dir = this.root().dir().resolve( Plugin.name.replace( /^\$/, '' ).replace( /_/g, '/' ) )
			while( !dir.exists() ) dir = dir.parent()
			return dir
		}

		scopes( plugins: Function[] ): Map< Function, $mol_file2[] > {
			const scopes = new Map< Function, $mol_file2[] >()

			for( const Plugin of plugins ) {
				const module = this.plugin_module( Plugin )
				const dirs = this.graph_roots().filter( build => this.reach( build ).has( module ) ).map( build => build.parent() )
				if( !dirs.length ) $mol_fail( new Error( `Plugin ${ Plugin.name } is not reachable from .build. files` ) )
				scopes.set( Plugin, dirs )
			}

			return scopes
		}

		@ $mol_mem
		script() {
			if( !this.graph_roots().length ) return null
			return this.root().bundle( this.$.$mol_build2_bundle_js ).artifacts( this ).find( file => /\.js$/.test( file.name() ) ) ?? null
		}

	}

}
