namespace $ {

	export type $mol_build_checker_remote = {
		error(rec: [filename: string, error: string][]): void
		write(rec: [path: string, data: string][]): void
	}

	export type $mol_build_checker_worker_data = {
		paths: readonly string[]
		root: string
		options: ReturnType<typeof $node.typescript.getDefaultCompilerOptions>
	}

	export class $mol_build_checker extends $mol_object {
		@ $mol_mem
		paths(next?: readonly string[]): readonly string[] {
			return next ?? this.worker_data().paths ?? []
		}

		@ $mol_mem
		root(next?: string): string {
			return next ?? this.worker_data().root ?? ''
		}

		@ $mol_mem
		options(next?: ReturnType<typeof $node.typescript.getDefaultCompilerOptions>) {
			return next ?? this.worker_data().options ?? $node.typescript.getDefaultCompilerOptions()
		}

		protected writes = [] as [path: string, data: string][]
		protected write_timeout = null as null | $mol_after_timeout

		protected write_flush() {
			this.write_timeout?.destructor()

			$mol_error_fence(() => this.remote().write(this.writes), e => (this.$.$mol_fail_log(e), null))

			this.writes = []
			this.write_timeout = null
		}

		write_add(path: string, data: string) {
			this.writes.push([ path, data ])
			this.write_timeout = this.write_timeout ?? new $mol_after_timeout(200, $mol_wire_async(() => this.write_flush()))
		}

		@ $mol_mem
		protected rpc() {
			return this.$.$mol_rpc_worker.make<typeof $mol_rpc_worker<$mol_build_checker_remote>>({
				handlers: () => this as $mol_rpc_methods<this>,
			})
		}

		protected worker_data() { return this.rpc().worker_data() as Partial<$mol_build_checker_worker_data> }

		protected remote() { return this.rpc().remote() }

		start() {
			try {
				this.remote()
				this.host()
			} catch(error) {
				if ($mol_promise_like(error)) $mol_fail_hidden(error)
				this.$.$mol_fail_log(error)
				process.exit(1)
			}
		}

		protected run() {}

		protected versions = {} as Record<string, number>
		protected watchers = new Map< string , ( path : string , kind : number )=> void >()


		protected errors = [] as [filename: string, error: string][]
		protected errors_timer = null as null | $mol_after_timeout

		protected error_add(filename: string, error: string) {
			this.errors.push([filename, error])
			this.errors_timer = this.errors_timer ?? new $mol_after_timeout(200, $mol_wire_async(() => this.errors_flush()))
		}

		@ $mol_action
		protected errors_flush() {
			this.errors_timer?.destructor()
			$mol_error_fence(
				() => this.remote().error(this.errors),
				e => (this.$.$mol_fail_log(e), null)
			)

			this.errors = []
			this.errors_timer = null
		}

		@ $mol_action
		protected recheck_internal() {
			const paths = this.paths()
			if (! paths.length) return null

			for( const path of paths ) {
				const version = $node.fs.statSync( path ).mtime.valueOf()
				if( this.versions[ path ] && this.versions[ path ] !== version ) {
					const watcher = this.watchers.get( path )
					if( watcher ) watcher( path , 2 )
				}
				this.versions[ path ] = version
			}
			this.run()
		}

		recheck() {
			this.host()
			this.recheck_internal()
			this.errors_flush()
			// this.write_flush()
			return null
		}

		@ $mol_mem
		protected host() {
			const paths = this.paths()
			if (! paths.length) return null
			const options = this.options()
			const root = this.root()

			const host = $node.typescript.createWatchCompilerHost(

				paths  as string[],
				
				{
					... options,
					emitDeclarationOnly : true,
				},
				
				{
					... $node.typescript.sys ,
					watchDirectory: ( path, cb ) => {
						// console.log('watchDirectory', path )
						this.watchers.set( path , cb )
						return { close(){} }
					},
					writeFile : (path , data )=> {
						this.write_add(path, data)
					},
					setTimeout : ( cb : any )=> {
						this.run = cb
					} ,
					watchFile : (path:string, cb:(path:string,kind:number)=>any )=> {
						// console.log('watchFile', path )
						this.watchers.set( path , cb )
						return { close(){ } }
					},
				},
				
				$node.typescript.createEmitAndSemanticDiagnosticsBuilderProgram,

				( diagnostic )=> {

					if( diagnostic.file ) {

						const error = $node.typescript.formatDiagnostic( diagnostic , {
							getCurrentDirectory : ()=> root ,
							getCanonicalFileName : ( path : string )=> path.toLowerCase() ,
							getNewLine : ()=> '\n' ,
						})
						const name = diagnostic.file.getSourceFile().fileName

						this.error_add( name , error )
						
					} else {
						const text = diagnostic.messageText
						this.$.$mol_log3_fail({
							place : `${this}.host()` ,
							message: typeof text === 'string' ? text : text.messageText ,
						})
					}
					
				} ,

				()=> {}, //watch reports
				
				[], // project refs
				
				{ // watch options
					synchronousWatchDirectory: true,
					watchFile: 5,
					watchDirectory: 0,
				},
				
			)

			const service = $node.typescript.createWatchProgram( host )

			return {
				destructor : ()=> service.close()
			}
		}

	}

}
