namespace $ {
	$mol_test({

		'is same number' () {
			const Nan = $mol_data_const( Number.NaN )
			Nan( Number.NaN )
		} ,

		'is equal object' () {
			const Tags = $mol_data_const({ tags: [ 'deep', 'equals' ] })
			Tags({ tags: [ 'deep', 'equals' ] })
		} ,

		'is different number' () {
			const Five = $mol_data_const( 5 )
			$mol_assert_fail( ()=> Five( 6 as any ) , '6 is not 5' )
		} ,

		'is different object' () {
			const Tags = $mol_data_const({ tags: [ 'deep', 'equals' ] })
			$mol_assert_fail(
				()=> Tags({ tags: [ 'shallow' as any, 'equals' ] }),
				`{"tags":["shallow","equals"]} is not {"tags":["deep","equals"]}`,
			)
		} ,

	})
}
