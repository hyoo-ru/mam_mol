namespace $ {

	$mol_test({
		
		async 'sync'() {

			const result = await $mol_fiber2.async( ()=> {
				return 777
			} )

			$mol_assert_equal( result , 777 )

		},

		async 'async'() {

			const result = await $mol_fiber2.async( ()=> {
				return $mol_fiber2.wait( async ()=> 777 )
			} )

			$mol_assert_equal( result , 777 )

		},

		async 'async serie'() {

			const result = await $mol_fiber2.async( ()=> {
				
				const a = $mol_fiber2.wait( async ()=> 333 )
				const b = $mol_fiber2.wait( async ()=> 444 )
				
				return a + b
				
			} )

			$mol_assert_equal( result , 777 )

		},

		async 'idempotence'() {

			let counter = 0
			const increment = $mol_fiber2.func( ()=> counter += 111 )

			const result = await $mol_fiber2.async( ()=> {

				increment()
				
				return $mol_fiber2.wait( async ()=> 777 )

			} )

			$mol_assert_equal( counter , 111 )
			$mol_assert_equal( result , 777 )

		},

		async 'nested idempotence'() {

			let counter = 0
			
			const increment = $mol_fiber2.func( ()=> counter += 111 )

			const calculate = $mol_fiber2.func( ()=> {
				
				increment()
				
				return counter + $mol_fiber2.wait( async ()=> 222 )

			} )

			const result = await $mol_fiber2.async( ()=> {

				increment()

				return calculate() + $mol_fiber2.wait( async ()=> 333 )

			} )

			$mol_assert_equal( counter , 222 )
			$mol_assert_equal( result , 777 )

		},

		'idempotence outside fiber'() {

			const fiberized = $mol_fiber2.func( ()=> {} )
				
			$mol_assert_fail( ()=> fiberized() , 'Fiberized code should be executed in $mol_fiber2.run' )

		},

		// async 'unidempotence'() {

		// 	let counter = 0
		// 	const fiberized = $mol_fiber2.func( ( n : number )=> n )

		// 	const result = await $mol_fiber2.async( ()=> {

		// 		// breaks idempotence
		// 		if( counter === 0 ) fiberized( counter ++ )

		// 		fiberized( counter )
				
		// 		return $mol_fiber2.wait( async ()=> 777 )

		// 	} )

		// 	$mol_assert_equal( counter , 1 )
		// 	$mol_assert_equal( result , 777 )

		// },

	})
	
}
