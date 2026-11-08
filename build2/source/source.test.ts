namespace $ {

	$mol_test({

		'existing dependency is ensured'() {
			const root = new $mol_build2_root
			const ensure = new $mol_build2_root_ensure
			const ensured = [] as string[]
			ensure.ensure = path => ( ensured.push( path ), false )
			root.ensure = $mol_const( ensure )

			const file = root.dir().resolve( 'mol/build2/fixture/branch/branch.ts' )
			root.source([ $mol_build2_source_ts, file ])!.deps()

			$mol_assert_equal( ensured.includes( root.dir().resolve( 'mol/build2/fixture/leaf' ).path() ), true )
		},

	})

}
