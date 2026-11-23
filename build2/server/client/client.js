class $mol_build2_server_client {

	static closed = false
	static reloading = false

	static run() {
		const origin = document.location.origin.replace( /^http/, 'ws' )
		const socket = new WebSocket( origin + document.location.pathname, 'mol_build2_reload' )

		socket.onclose = ()=> {
			if( this.reloading ) return
			this.closed = true
			setTimeout( ()=> this.run(), 1000 )
		}

		socket.onopen = ()=> {
			if( this.closed ) location.reload()
			this.closed = false
		}

		socket.onmessage = event => {
			if( event.data !== '$mol_build2_obsolete' ) return
			this.reloading = true
			location.reload()
		}
	}

}

$mol_build2_server_client.run()
