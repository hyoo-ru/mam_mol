namespace $ {

	export class $mol_build2_bundle_audit_js extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()
			
			const prefix = slice.prefix().replace( /\.test$/, '' )
			
			const output = slice.pack().output()
			const target = output.resolve( `${prefix}.audit.js` )

			const paths = this.ts_paths( slice )
			const versions = paths.map( path => this.$.$mol_file2.absolute( path ).version() ).join( ',' )

			const changes = this.checker( slice )?.recheck( versions )
			if( changes ) this.checker_changes_apply( changes )
			
			for( const path of paths ) {
				if( /\.d\.ts/.test( path ) ) continue
				this.root().convert([ this.$.$mol_build2_convert_ts, this.$.$mol_file2.absolute( path ) ])?.transpile_out()
			}

			const errors = ( changes?.errors ?? [] )
				.filter( ([ path ])=> !/\.d\.ts$/.test( path ) )
				.map( ([ , error ])=> new Error( error ) )
			
			this.log( target, Date.now() - start )
			
			if( errors.length ) {
				$mol_fail_hidden( new $mol_error_mix( `Build fail ${ slice.pack().dir().relate( slice.root().dir() ) }`, {}, ... errors ) )
			}

			target.text( `console.info( '%c ▫ $mol_build2 ▫ Audit passed', 'color:forestgreen; font-weight:bolder' )` )
			
			return [ target ]
		}

		@ $mol_mem_key
		checker( slice: $mol_build2_package_slice ) {
			return this.checker_rpc( slice )?.remote() ?? null
		}

		@ $mol_mem_key
		checker_rpc( slice: $mol_build2_package_slice ) {
			const paths = this.ts_paths( slice )
			if( !paths.length ) return null

			const handlers: $mol_build2_bundle_checker_remote = {
				changes: changes => this.checker_changes_apply( changes ),
				status: ()=> {},
			}

			const workerData: $mol_build2_bundle_checker_worker_data = {
				paths,
				root: this.root().dir().path(),
				options: this.root().ts_options(),
			}

			return this.$.$mol_rpc_worker.make< typeof $mol_rpc_worker< $mol_build2_bundle_checker_shared > >({
				options: $mol_const({
					resourceLimits: {
						maxOldGenerationSizeMb: this.checker_max_mem(),
					},
					workerData,
				}),
				uri: () => __filename,
				handlers: () => handlers,
			})
		}

		checker_max_mem() {
			return Number( this.$.$mol_env().MAM_CHECKER_MAX_MEM || this.$.$mol_env().MOL_BUILD_CHECKER_MAX_MEM || '2560' )
		}

		@ $mol_action
		checker_changes_apply( changes: $mol_build2_bundle_checker_changes ) {
			for( const [ path, data ] of changes.writes ) {
				this.$.$mol_file2.relative( path ).text( data, 'virt' )
			}
		}

		@ $mol_mem_key
		ts_paths( slice: $mol_build2_package_slice ) {

			const sources = [ ...slice.files_of( this.$.$mol_build2_source_ts ) ]

			const lines = [] as string[]

			for( const dep of slice.node_deps() ) {
				lines.push( '\t' + JSON.stringify( dep ) + ': typeof import\( ' + JSON.stringify( dep ) + ' )' )
			}

			if( lines.length > 0 ) {

				const is_node = /node/.test( slice.prefix() )

				const decls = [ 'interface $'+'npm {\n ' + lines.join( '\n' ) + '\n}' ]
				if( is_node ) decls.push( 'interface $node {\n ' + lines.join( '\n' ) + '\n}' )

				const types = slice.pack().dir().resolve( `-${ is_node ? 'node' : 'web' }/deps.d.ts` )
				types.text( decls.join( '\n' ) )
				sources.push( types )

			}

			return sources.map( src => src.path() )
		}

	}

}
