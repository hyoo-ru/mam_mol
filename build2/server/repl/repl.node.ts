namespace $ {

	type $mol_build2_server_repl_host = {
		start( command: string ): void
		stop( command: string ): void
	}

	export class $mol_build2_server_repl extends $mol_object2 {

		host(): $mol_build2_server_repl_host {
			return $mol_fail( new Error( 'host is not set' ) )
		}

		hint() {
			return 'start: + path/to/module args\nstop:  - path/to/module args'
		}

		@ $mol_mem
		terminal() {

			if( !process.stdin.isTTY ) return null // дичь для агентов, что бы они могли сами запускать дев сервер без костылей, слегка полезно для докера

			const terminal = $node.readline.createInterface({
				input: process.stdin,
				output: process.stdout,
				history: [],
				tabSize: 4,
				prompt: '',
			})
			terminal.prompt()

			terminal
				.on( 'line', line => this.execute( line ) )
				.on( 'SIGINT', ()=> process.exit( 0 ) )
				.on( 'close', ()=> process.exit( 0 ) )

			return terminal
		}

		execute( line: string ) {
			if( !line.trim() ) return

			const [ action, ... params ] = line.split( ' ' )
			const command = params.join( ' ' )

			switch( action ) {
				case '+': return this.host().start( command )
				case '-': return this.host().stop( command )
				case '?':
				default: return console.log( this.hint() )
			}
		}

		_auto() {
			this.terminal()
		}

	}

}
