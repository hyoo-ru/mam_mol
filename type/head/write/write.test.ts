namespace $ {

	type write1 = $mol_type_assert<

		$mol_type_head_write<
			[ 1, 2, 3 ],
			0
		>,
		[ 0, 2, 3 ]

	>

	type write2 = $mol_type_assert<

		$mol_type_head_write<
			[],
			0
		>,
		[ 0 ]

	>

}
