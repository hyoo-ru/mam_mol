namespace $ {

	export type $mol_build_checker_status = 'ready' | 'watching'

	export type $mol_build_checker_shared = {
		recheck(): $mol_build_checker_changes | null
	}

	export type $mol_build_checker_remote = {
		changes(rec: $mol_build_checker_changes): void
		status(next: $mol_build_checker_status): void
	}

	export type $mol_build_checker_changes = {
		writes: [path: string, data: string][]
		errors: [path: string, error: string][]
	}

	export type $mol_build_checker_worker_data = {
		paths: readonly string[]
		root: string
		options: ReturnType<typeof $node.typescript.getDefaultCompilerOptions>
	}

	export class $mol_build_checker extends $mol_object {
		paths() { return this.worker_data().paths ?? [] }
		root() { return this.worker_data().root ?? '' }
		options() {
			return this.worker_data().options ?? $node.typescript.getDefaultCompilerOptions()
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
				const watching = this.watching()
				if (watching) this.host()
				this.remote().status(watching ? 'watching' : 'ready')
			} catch(error) {
				if ($mol_promise_like(error)) $mol_fail_hidden(error)
				this.$.$mol_fail_log(error)
				process.exit(1)
			}
		}


		protected run() {}

		protected versions = {} as Record<string, number>
		protected watchers = new Map< string , ( path : string , kind : number )=> void >()

		protected writes = [] as [path: string, data: string][]
		protected errors = [] as [filename: string, error: string][]
		protected changes_tick = null as null | undefined | $mol_after_tick

		@ $mol_action
		protected changes_cut(): $mol_build_checker_changes | null {
			const writes = this.writes
			const errors = this.errors

			this.changes_tick?.destructor()
			this.changes_tick = null

			if (! errors.length && ! writes.length ) return null

			this.writes = []
			this.errors = []

			return { writes, errors }
		}

		changes_flush() {
			const changes = this.changes_cut()
			if (! changes ) return
			$mol_error_fence(() => this.remote().changes(changes), e => ($mol_fail_log(e), null))
		}

		protected changes_schedule() {
			// ts watcher calls it in host syncronously
			if (this.changes_tick === undefined) return
			if (this.changes_tick !== null) return
			this.changes_tick = new $mol_after_tick(() => $mol_wire_async(this).changes_flush())
		}

		protected write_add(path: string, data: string) {
			this.writes.push([ path, data ])
			this.changes_schedule()
		}

		protected error_add(filename: string, error: string) {
			this.errors.push([filename, error])
			this.changes_schedule()
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

		// Do not place async logic here, to prevent recheck calls race
		recheck() {
			this.changes_tick?.destructor()
			this.changes_tick = undefined // disable watch sending
			this.watching(true) // enable host pull in start
			this.host() // wait host started
			this.recheck_internal()
			return this.changes_cut()
		}

		@ $mol_mem
		protected watching(next?: boolean) { return next ?? false }

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
