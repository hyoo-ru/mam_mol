namespace $ {

	$mol_test_mocks.push( async $ => {
		await $mol_fiber_warp()
		$mol_fiber.deadline = Date.now() + 100
	} )
	
}
