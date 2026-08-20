namespace $.$$ {

	export class $mol_rest_resource_test extends $mol_rest_resource {

		nested() {
			return new $mol_rest_resource
		}

	}

	$mol_test({

		async 'nested async handler starts once on wire replay'( $ ) {
			let starts = 0
			const nested = $mol_rest_resource.make({
				$: $,
				POST: async()=> {
					++ starts
					await Promise.resolve()
					await Promise.resolve()
				},
			})
			const root = $mol_rest_resource_test.make({
				$: $,
				nested: ()=> nested,
			})
			const message = $mol_rest_message.make({
				method: ()=> 'POST',
				uri: ()=> new URL( 'http://foo.bar:8080/nested/' ),
				port: $mol_rest_port.make({}),
			})

			await $mol_wire_async( root ).REQUEST( message )

			$mol_assert_equal( starts, 1 )
		},

		'route keeps derived message stable'( $ ) {
			const message = $mol_rest_message.make({
				port: $mol_rest_port.make({}),
			})
			const href = 'http://foo.bar:8080/nested/?foo=bar'

			$mol_assert_equal(
				message.route( new URL( href ) ),
				message.route( new URL( href ) ),
			)
		},

	})

}
