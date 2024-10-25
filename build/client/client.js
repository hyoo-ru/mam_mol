function $mol_build_client() {
	
	const origin = document.location.origin.replace( /^http/ , 'ws' )
	const path = document.location.pathname
	const uri = origin + path

	const socket = new WebSocket( uri )
	
	socket.onclose = ()=> setTimeout( ()=> $mol_build_client() , 1000 )
	
	socket.onmessage = message => {
		if( message.data !== '$mol_build_obsolete' ) return
		sessionStorage.setItem('$mol_build_obsolete', '1')
		location.reload()
	}

}

$mol_build_client()

