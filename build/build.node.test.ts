namespace $ {
	$.$mol_build_start = ()=> {}
	$mol_test({
		'Completed'() {
			console.log( 'All tests passes.' )
			process.exit(0)
		}
	})
}
