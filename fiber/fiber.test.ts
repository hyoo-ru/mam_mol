namespace $ {

	$mol_test_mocks.push( async $ => {
		await $mol_fiber_warp()
		$mol_fiber.deadline = Date.now() + 100
	} )
	
	
	$mol_test({

		'sync to async': async $ => {
			
			const sum = $mol_fiber_async( ( a : number , b : number )=> a + b )
			
			const res = await sum( 1 , 2 )

			$mol_assert_equal( res , 3 )

		},

	})
	
}
