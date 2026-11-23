namespace $ {

	/** Collects sources by dependencies. */
	export class $mol_build2_package_slice extends $mol_object2 {

		pack(): $mol_build2_package {
			return $mol_fail( new Error( 'pack is not set' ) )
		}

		root() {
			return this.pack().root()
		}
		
		prefix() {
			return 'index'
		}

		filter( file: $mol_file2 ) {
			return !/\.build\./.test( file.name() )
		}

		plugins(): $mol_build2_plugin[] {
			return [ ... $mol_build2_root.plugins, ... this.pack().plugins() ]
		}

		plugin_scopes(): Map< Function, $mol_file2[] > {
			return this.pack().plugin_scopes()
		}

		plugin_visible( Plugin: Function, file: $mol_file2 ) {
			const scopes = this.plugin_scopes().get( Plugin )
			if( !scopes ) return true
			return scopes.some( dir => file === dir || file.path().startsWith( dir.path() + '/' ) )
		}

		plugins_of< Base extends Function >( Base: Base, file: $mol_file2 ): Base[] {
			return this.plugins().filter( Plugin => Plugin.prototype instanceof Base && this.plugin_visible( Plugin, file ) ) as unknown as Base[]
		}

		plugins_check( file: $mol_file2, items: object[] ) {
			const plugins = this.plugins() as Function[]
			const names = items.map( item => item.constructor ).filter( ctor => plugins.includes( ctor ) ).map( ctor => ctor.name )
			if( names.length < 2 ) return
			$mol_fail( new Error( `Plugins conflict on ${ file.relate( this.root().dir() ) }: ${ names.join( ', ' ) }` ) )
		}

		source_classes( file = this.pack().dir() ) {
			return [ ... this.root().source_classes(), ... this.plugins_of( $mol_build2_source, file ) ]
		}

		convert_classes( file = this.pack().dir() ) {
			return [ ... this.root().convert_classes(), ... this.plugins_of( $mol_build2_convert, file ) ]
		}

		bundle_classes() {
			return [ ... this.root().bundle_classes(), ... this.plugins_of( $mol_build2_bundle, this.pack().dir() ) ]
		}

		@ $mol_mem_key
		sources( file: $mol_file2 ) {
			const sources = this.source_classes( file ).flatMap( ctor => this.root().source([ ctor, file ]) ?? [] )
			this.plugins_check( file, sources )
			return sources
		}

		@ $mol_mem_key
		converts( file: $mol_file2 ) {
			const converts = this.convert_classes( file ).flatMap( ctor => this.root().convert([ ctor, file ]) ?? [] )
			this.plugins_check( file, converts )
			return converts
		}

		@ $mol_mem
		bundles() {
			return this.bundle_classes().map( ctor => this.root().bundle( ctor ) )
		}

		link_max(
			graph: $mol_graph< $mol_file2, { priority: number } >,
			from: $mol_file2,
			to: $mol_file2,
			priority: number,
		) {
			const edge = graph.edge_out( from, to )
			if( !edge || edge.priority < priority ) {
				graph.link( from, to, { priority } )
			}
		}

		@ $mol_mem_key
		file_deps( file: $mol_file2 ) {
			const deps = [] as [ $mol_file2, number ][]

			for( const source of this.sources( file ) ) {
				for( const[ dep, priority ] of source.deps() ) {
					if( !this.filter( dep ) ) continue
					if( dep.path() === file.path() ) continue
					const npm = /^node_modules\/((?:@[^/]+\/)?[^/]+)\/package\.json$/.exec( dep.relate( this.root().dir() ) )
					deps.push([ npm ? this.npm_package( npm[1] ) : dep, priority ])
				}
			}

			if( file.type() === 'file' ) {
				for( const gen of this.file_generated_sources( file ) ) {
					deps.push([ gen, 1 ])
				}
			}

			return deps
		}

		file_generated_sources( file: $mol_file2 ) {
			return this.converts( file ).flatMap( convert => convert.generated_sources()
				.filter( gen => this.filter( gen ) ) )
		}

		file_generated_artifacts( file: $mol_file2 ) {
			return this.converts( file ).flatMap( convert => convert.artifacts_for( this )
				.filter( gen => this.filter( gen ) ) )
		}

		@ $mol_mem
		node_deps(): string[] {

			const deps = new Set< string >()

			for( const file of this.files() ) {

				const file_deps = this.root().source( [ this.$.$mol_build2_source_ts, file ] )?.ts_source_deps().npm.deps
				file_deps?.forEach( dep => deps.add( dep ) )

			}

			deps.forEach( dep => {
				if( $node_internal_check( dep ) ) return
				if( dep === 'internal' ) return
				this.npm_package( dep )
			} )

			return [ ... deps ]

		}

		@ $mol_mem
		npm_dir() {
			const dir = this.pack().dir()
			return dir.resolve( 'index.html' ).exists() ? dir : this.root().dir()
		}

		@ $mol_mem_key
		npm_package( name: string ) {
			const json = this.npm_dir().resolve( `node_modules/${ name }/package.json` )
			if( !json.exists() ) this.npm_install( name )
			return json
		}

		npm_install( name: string ) {

			const dir = this.npm_dir()
			if( dir === this.root().dir() ) return this.$.$node_autoinstall( name )

			const command = [ 'npm', 'install', '--no-package-lock', '--prefix', dir.path() ]
			const save = /^web/.test( this.prefix() ) ? '--save' : '--save-dev'
			this.$.$mol_file2.unwatched( ()=> this.$.$mol_run.spawn({ command: [ ... command, save, name ], dir: dir.path() }), dir.path() )

			try {
				this.$.$mol_file2.unwatched( ()=> this.$.$mol_run.spawn({ command: [ ... command, '--save-dev', '@types/' + name ], dir: dir.path() }), dir.path() )
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				this.$.$mol_fail_log( error )
			}

		}

		graph_roots() {
			return [ this.pack().dir() ]
		}

		@ $mol_mem
		graph() {
			
			const ignore = new Set<$mol_file2>()
			const graph = new $mol_graph< $mol_file2, { priority: number } >()

			const collect = ( file: $mol_file2 ): void => {

				if( ignore.has( file ) ) return
				ignore.add( file )

				graph.nodes.add( file )

				for( const[ dep, priority ] of this.file_deps( file ) ) {
					collect( dep )
					this.link_max( graph, file, dep, priority )
				}

			}

			for( const file of this.graph_roots() ) collect( file )
			
			graph.acyclic( edge => edge.priority )
			
			return graph
		}

		@ $mol_mem
		files() {
			const files = new Set< $mol_file2 >()

			const add = ( file: $mol_file2 )=> {
				if( file.type() !== 'file' ) return
				files.add( file )

				if( /\.d\.ts$/.test( file.name() ) ) return
				if( !file.exists() ) return

				for( const gen of this.file_generated_artifacts( file ) ) {
					files.add( gen )
				}
			}

			const waits = [] as PromiseLike< unknown >[]
			const errors = [] as Error[]

			for( const file of this.graph().sorted ) {
				try {
					add( file )
				} catch( error ) {
					if( $mol_promise_like( error ) ) waits.push( error )
					else errors.push( error as Error )
				}
			}

			if( waits.length ) $mol_fail_hidden( Promise.allSettled( waits ) )
			if( errors.length === 1 ) $mol_fail_hidden( errors[0] )
			if( errors.length ) $mol_fail( new $mol_error_mix( `${ errors.length } files failed`, {}, ... errors ) )

			return files
		}

		/** Все исходники слайса, на которые срабатывает данный лоадер. */
		@ $mol_mem_key
		files_of< Source extends typeof $mol_build2_source >( Source: Source ) {
			return [ ...this.files() ].filter( file => Source.match( file ) )
		}

		@ $mol_mem
		bundles_generated() {
			return this.bundles().flatMap( bundle => bundle.artifacts( this ) )
		}

	}

}
