// @ts-check

class $mol_build_client {
	static closed = false
	static run() {
		const origin = document.location.origin.replace( /^http/ , 'ws' )
		const path = document.location.pathname
		const uri = origin + path

		const socket = new WebSocket( uri )
		
		socket.onclose = ()=> {
			this.closed = true
			setTimeout( ()=> $mol_build_client.run() , 1000 )
		}

		socket.onopen = () => {
			if (this.closed) location.reload()
			this.closed = false
		}
		
		socket.onmessage = message => {
			if( message.data !== '$mol_build_obsolete' ) return
			location.reload()
		}

	}
}

$mol_build_client.run()

