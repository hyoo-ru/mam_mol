namespace $.$$ {
	$mol_test({
		
		"GET root index html"( $ ) {
			
			const app = $mol_rest_demo.make({ $ })
			
			const res = [] as any[]
			
			app.GET( $mol_rest_message.make({
				uri: ()=> new URL( 'http://foo.bar:8080/' ),
				port: $mol_rest_port.make({
					send_type: type => res.push( type ),
					send_bin: bin => res.push( bin.byteLength > 100 ),
				}),
			}) )
			
			$mol_assert_equal( res, [ 'text/html', true ] )
			
		},
		
		"GET unknown resource"( $ ) {
			
			const app = $mol_rest_demo.make({ $ })
			
			const res = [] as any[]
			
			app.GET( $mol_rest_message.make({
				uri: ()=> new URL( 'http://foo.bar:8080/not/found' ),
				port: $mol_rest_port.make({
					send_code: code => res.push( code ),
					send_type: type => res.push( type ),
					send_nil: ()=> res.push( null ),
				}),
			}) )
			
			$mol_assert_equal( res, [ 404, null ])
			
		},
		
		"GET returns path and query"( $ ) {
			
			const test = $mol_rest_demo_test.make({ $ })
			
			const res = [] as any[]
			
			test.GET( $mol_rest_message.make({
				uri: ()=> new URL( 'http://foo.bar:8080/xxx?foo=bar' ),
				port: $mol_rest_port.make({
					send_json: json => res.push( json ),
				}),
			}) )
			
			$mol_assert_equal( res, [{
				path: '/xxx',
				query: [
					[ 'foo', 'bar' ],
				],
			}] )
			
		},
		
		"REQUEST nested path and query"( $ ) {
			
			const test = $mol_rest_demo_test.make({ $ })
			
			const res = [] as any[]
			
			test.REQUEST( $mol_rest_message.make({
				method: ()=> 'GET',
				uri: ()=> new URL( 'http://foo.bar:8080/nested/xxx?foo=bar' ),
				port: $mol_rest_port.make({
					send_json: json => res.push( json ),
				}),
			}) )
			
			$mol_assert_equal( res, [{
				path: '/xxx',
				query: [
					[ 'foo', 'bar' ],
				],
			}] )
			
		},
		
		"POST mirrors type and body"( $ ) {
			
			const test = $mol_rest_demo_test.make({ $ })
			
			const res = [] as any[]
			
			test.POST( $mol_rest_message.make({
				type: ()=> 'text/foo',
				data: ()=> 'bar',
				port: $mol_rest_port.make({
					send_type: type => res.push( type ),
					send_text: text => res.push( text ),
				}),
			}) )
			
			$mol_assert_equal( res, [ 'text/foo', 'bar' ] )
			
		},
		
		"PUT returns type in XML"( $ ) {
			
			const test = $mol_rest_demo_test.make({ $ })
			
			const res = [] as any[]
			let x = new Response
			test.PUT( $mol_rest_message.make({
				type: ()=> 'text/foo',
				port: $mol_rest_port.make({
					send_code: code => res.push( code ),
					send_type: type => res.push( type ),
					send_text: text => res.push( text ),
				}),
			}) )
			
			$mol_assert_equal( res, [
				200, 'text/html',
				'<body xmlns="http://www.w3.org/1999/xhtml">text/foo</body>',
			] )
			
		},
		
		"DELETE returns no body"( $ ) {
			
			const test = $mol_rest_demo_test.make({ $ })
			
			const res = [] as any[]
			let x = new Response
			test.DELETE( $mol_rest_message.make({
				port: $mol_rest_port.make({
					send_code: code => res.push( code ),
					send_type: type => res.push( type ),
					send_bin: bin => res.push( bin ),
				}),
			}) )
			
			$mol_assert_equal( res, [ 204 ] )
			
		},
		
	})
}
