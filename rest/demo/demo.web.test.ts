namespace $.$$ {
	$mol_test({
		
		async "GET request and URI parse"( $ ) {
			
			$mol_assert_equal(
				await fetch( './test' ).then( r => r.json() ),
				{
					path: "/",
					query: [],
				},
			)
			
			$mol_assert_equal(
				await fetch( './test/user?id=777#show=all' ).then( r => r.json() ),
				{
					path: "/user",
					query: [
						[ 'id', "777" ],
					],
				},
			)
			
			$mol_assert_equal(
				await fetch( './test/nested/?user=jin' ).then( r => r.json() ),
				{
					path: "/",
					query: [
						[ 'user', "jin" ],
					],
				},
			)
			
		},
		
		async "POST Binary and return it"( $ ) {
			
			const resp = await fetch( './test', {
				method: 'post',
				body: new Uint8Array([ 1, 2, 3 ]),
			} )
			
			$mol_assert_equal( resp.status, 200 )
			
			$mol_assert_equal(
				resp.headers.get( 'content-type' ),
				'application/octet-stream',
			)
			
			$mol_assert_equal(
				new Uint8Array( await resp.arrayBuffer() ),
				new Uint8Array([ 1, 2, 3 ]),
			)
			
		},
		
		async "POST Text and return it"( $ ) {
			
			const resp = await fetch( './test', {
				method: 'post',
				body: 'hello',
			} )
			
			$mol_assert_equal( resp.status, 200 )
			
			$mol_assert_equal(
				resp.headers.get( 'content-type' ),
				'text/plain;charset=UTF-8',
			)
			
			$mol_assert_equal(
				await resp.text(),
				'hello',
			)
			
		},
		
		async "POST JSON and return it"( $ ) {
			
			const resp = await fetch( './test', {
				method: 'post',
				headers: { type: 'application/json' },
				body: '{ "foo": 777 }',
			} )
			
			$mol_assert_equal( resp.status, 200 )
			
			$mol_assert_equal(
				resp.headers.get( 'content-type' ),
				'text/plain;charset=UTF-8',
			)
			
			$mol_assert_equal(
				await resp.json(),
				{ "foo": 777 },
			)
			
		},
		
		async "POST HTML and return it"( $ ) {
			
			const resp = await fetch( './test', {
				method: 'post',
				headers: { 'content-type': 'text/html' },
				body: '<body>hello</body>',
			} )
			
			$mol_assert_equal( resp.status, 200 )
			
			$mol_assert_equal(
				resp.headers.get( 'content-type' ),
				'text/html',
			)
			
			$mol_assert_equal(
				await resp.text(),
				'<body>hello</body>',
			)
			
		},
		
		async "PUT nothing and return HTML"( $ ) {
			
			const resp = await fetch( './test', {
				method: 'put',
			} )
			
			$mol_assert_equal( resp.status, 200 )
			
			$mol_assert_equal(
				resp.headers.get( 'content-type' ),
				'text/html',
			)
			
			$mol_assert_equal(
				await resp.text(),
				'<body xmlns="http://www.w3.org/1999/xhtml">application/octet-stream</body>',
			)
			
		},
		
		async "DELETE and return nothing"( $ ) {
			
			const resp = await fetch( './test', {
				method: 'delete',
			} )
			
			$mol_assert_equal( resp.status, 204 )
			$mol_assert_equal( resp.headers.get( 'content-type' ), null )
			
			$mol_assert_equal(
				new Uint8Array( await resp.arrayBuffer() ),
				new Uint8Array,
			)
			
		},
		
		async "WebSocket conection"( $ ) {
			
			const url = new URL( './test', document.location.href ) 
			url.protocol = 'ws:'
			
			const ws = new WebSocket( url )
			ws.binaryType = 'arraybuffer'
			
			await new Promise( ( done, fail )=> {
				ws.onopen = done
				ws.onerror = fail
				ws.onmessage = console.log
			} )
			
			ws.send( 'Hello, Мир!' )
			
			$mol_assert_equal(
				await new Promise( ( done, fail )=> {
					ws.onmessage = event => done( event.data )
					ws.onerror = fail
				} ),
				'Hello, Мир!',
			)
			
			ws.send( new Uint8Array([1,2,3]) )
			
			$mol_assert_equal(
				await new Promise( ( done, fail )=> {
					ws.onmessage = event => done( new Uint8Array( event.data ) )
					ws.onerror = fail
				} ),
				new Uint8Array([1,2,3]),
			)
			
		},
		
	})
}
