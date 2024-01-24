# $mol_rest

Rich REST server. **Alpha-version**

- **Composable.** One rest resource can be composed from others.
- **Isomorphic**. Same API for HTTP, WebRTC, Webmsget(WIP).

## Simple CRUD

```ts
@ $mol_rest_server.start
export class $my_crud extends $mol_rest_resource {
	
	GET( msg: $mol_rest_message ) {
		// returns received query as json
		msg.reply({
			path: msg.uri().pathname,
			query: [ ... msg.uri().searchParams ],
		})
	}
	
	POST( msg: $mol_rest_message ) {
		// returns received body as is
		msg.reply( msg.data() )
	}
	
	PUT( msg: $mol_rest_message ) {
		// returns received type in xml
		msg.reply( <body>{ msg.type() }</body> )
	}
	
	DELETE( msg: $mol_rest_message ) {
		// returns empty body
		msg.reply( null )
	}
	
	@ $mol_mem nested() { return $mol_rest_demo_crud.make({}) }
	
}
```

### Start develop

```sh
npm start
+ my/crud $my_crud=9090
```

### Build release

```sh
npm start my/crud
```

### Start release
```sh
node my/crud/-/node.js $my_crud=9090
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
	body: con.localDescription.sdp,
} ).then( res => res.text() )

// Wait Connection
await con.setRemoteDescription({ sdp, type: 'answer' })
await new Promise( done => chan.onopen = done )

// Same as POST HTTP Request with same Query
chan.send( 'ping' )
```

## Composing Resources

```tsx
@ $mol_rest_server.start
export class $my_name extends $mol_rest_resource {
	
	// Root handler
	GET( msg: $mol_rest_message ) {
		msg.reply(
			<body>
				<a href="./name/">Name</a>
				<a href="./admin/">Admin</a>
			</body>
		)
	}
	
	@ $mol_mem name() { return $my_name.make({}) }
	@ $mol_mem admin() { return $my_admin.make({}) }
	
}

export class $my_name extends $mol_rest_resource {
	
	// Sync handler
	GET( msg: $mol_rest_message ) {
		this.$.$mol_wait_timeout( 1000 )
		msg.reply( 'Jin' )
	}
	
}

export class $my_admin extends $mol_rest_resource {
	
	// Async handler
	async GET( msg: $mol_rest_message ) {
		await this.$.$mol_wait_timeout_async( 1000 )
		msg.reply( 'Admin' )
	}
	
}
```
