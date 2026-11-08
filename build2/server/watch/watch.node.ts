namespace $ {

	type $mol_build2_server_watch_host = {
		web_js_artifacts( path: string ): $mol_file2[]
	}

	export class $mol_build2_server_watch extends $mol_object2 {

		host(): $mol_build2_server_watch_host {
			return $mol_fail( new Error( 'host is not set' ) )
		}

		@ $mol_mem
		clients( next = new Map< $mol_rest_port, string >() ) {
			return next
		}

		open( port: $mol_rest_port, path: string ) {
			this.clients( new Map([ ... this.clients(), [ port, path ] ]) )

			this.$.$mol_log3_rise({
				place: this.host(),
				message: 'Connect',
				path,
			})
		}

		close( port: $mol_rest_port ) {
			const path = this.clients().get( port )
			const clients = new Map( this.clients() )
			clients.delete( port )
			this.clients( clients )

			this.$.$mol_log3_rise({
				place: this.host(),
				message: 'Disconnect',
				path,
			})
		}

		@ $mol_mem_key
		protected obsolete( [ port, path ]: [ $mol_rest_port, string ] ) {
			$mol_error_fence(
				()=> this.host().web_js_artifacts( path ).map( file => file.version() ),
				error => {
					this.$.$mol_log3_fail({
						place: `${this}.obsolete()`,
						message: error.message ?? String( error ),
						stack: error.stack,
						path,
					})
					return null
				},
			)

			if( !$mol_mem_cached( ()=> this.obsolete([ port, path ]) ) ) return true

			this.$.$mol_log3_rise({
				place: this.host(),
				message: '$mol_build2_obsolete',
				path,
			})

			port.send_text( '$mol_build2_obsolete' )

			return true
		}

		_auto() {
			for( const pair of this.clients() ) {
				this.obsolete( pair )
			}
		}

	}

}
