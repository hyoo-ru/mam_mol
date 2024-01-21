# $mol_rest

Rich REST server. **Alpha-version**

- **Composable.** One rest resource can be composed from others.
- **Humane.** Parses url as HARP Query.
- **Isomorphic**. Same API for HTTP, WebRTC, WebSocket(WIP).

## Simple CRUD

```ts
export class $my_crud extends $mol_rest_resource {
	
	GET( sock: $mol_rest_socket ) {
		sock.send( sock.query() ) // returns received query
	}
	
	POST( sock: $mol_rest_socket ) {
		sock.send( sock.data() ) // returns received body
	}
	
	PUT( sock: $mol_rest_socket ) {
		sock.send( sock.type() ) // returns received type
	}
	
	DELETE( sock: $mol_rest_socket ) {
		sock.send( null ) // returns empty body
	}
	
}
$my_crud.serve()
```

### Start develop

```sh
npm start
+ my/server port=9090
```

### Build release

```sh
npm start my/server
```

### Start release
```sh
node my/server/-/node.js port=9090
```

## HTTP Requests

```ts
const response = $my_fetch.json( '/foo/bar=777/?xxx=lol' )
```

## WebRTC Requests

To do: **Make simple client-side API**.

```ts
const con = new RTCPeerConnection

// Make & setup DataChannel
const chan = con.createDataChannel( '$my_channel', { negotiated : true, id: 0 } )
chan.onmessage = e => console.log( e.data )

// Wait ICE candidate
await con.setLocalDescription()
await new Promise( done => con.onicecandidate = ({ candidate })=> done( candidate ) )

// Exchange SDP
const sdp = await fetch( '/any/query', {
	headers: { 'content-type': 'application/sdp' },
	method: 'options',
	body: on.localDescription.sdp,
} ).then( res => res.text() )

// Wait Connection
await con.setRemoteDescription({ sdp, type: 'answer' })
await new Promise( done => chan.onopen = done )

// Same as POST HTTP Request with same Query
chan.send( 'ping' )
```

## Composing Resources

To do: **Better XML support**.

```tsx
export class $my_name extends $mol_rest_resource {
	
	// Root handler
	GET( sock: $mol_rest_socket ) {
		sock.send( (<body>
			<a href="./name/">Name</a>
			<a href="./admin/">Admin</a>
		</body>).outerHTML, { type: 'text/html' } )
	}
	
	@ $mol_mem name() { return $my_name.make({}) }
	@ $mol_mem admin() { return $my_admin.make({}) }
	
}

export class $my_name extends $mol_rest_resource {
	
	// Sync handler
	GET( sock: $mol_rest_socket ) {
		this.$.$mol_wait_timeout( 1000 )
		sock.send( 'Jin' )
	}
	
}

export class $my_admin extends $mol_rest_resource {
	
	// Async handler
	async GET( sock: $mol_rest_socket ) {
		await this.$.$mol_wait_timeout_async( 1000 )
		sock.send( 'Admin Panel' )
	}
	
}
```
