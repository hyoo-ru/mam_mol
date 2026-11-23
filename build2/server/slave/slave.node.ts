namespace $ {

	type $mol_build2_server_slave_host = {
		requested_bundle_artifacts( path: string, name: string ): $mol_file2[]
	}

	export class $mol_build2_server_slave extends $mol_object2 {

		host(): $mol_build2_server_slave_host {
			return $mol_fail( new Error( 'host is not set' ) )
		}

		@ $mol_mem
		commands( next = [] as string[] ) {
			return next
		}

		start( command: string ) {
			this.commands([ ... this.commands(), command ])
		}

		stop( command: string ) {
			this.commands( this.commands().filter( item => item !== command ) )
		}

		@ $mol_mem
		servers() {
			return this.commands().map( command => this.server( command ) )
		}

		@ $mol_mem_key
		server( command: string ) {
			const [ path, ... args ] = command.split( ' ' )
			const launch = `node ./${ path }/-/node.js ${ args.join( ' ' ) }`

			const prev = $mol_wire_probe( ()=> this.server( command ) )
			if( prev ) prev.destructor()

			try {
				this.host().requested_bundle_artifacts( path, 'node.js' )
				this.host().requested_bundle_artifacts( path, 'node.audit.js' )
				this.host().requested_bundle_artifacts( path, 'node.test.js' )
			} catch( error: any ) {
				if( $mol_fail_catch( error ) ) {
					this.$.$mol_log3_fail({
						place: `${ this }.server`,
						stack: error.stack,
						message: error.message ?? error,
					})
				}
				return null
			}

			this.$.$mol_log3_come({
				place: this,
				message: 'Start',
				command: launch,
			})

			const server = $node[ 'child_process' ].spawn(
				'node',
				[ '--enable-source-maps', '--trace-uncaught', `./${ path }/-/node.js`, ... args ],
				{
					stdio: [ 'pipe', 'inherit', 'inherit' ],
				},
			)

			return Object.assign( server, {
				destructor: ()=> {
					if( server.killed ) return
					server.kill()
					this.$.$mol_log3_done({
						place: this,
						message: 'Stopped',
						command: launch,
					})
				},
			} )
		}

		_auto() {
			this.servers()
		}

	}

}
