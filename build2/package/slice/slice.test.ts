namespace $ {

	function sources( name: string, Slice: typeof $mol_build2_package_slice ) {
		const root = new $mol_build2_root
		const ensure = new $mol_build2_root_ensure
		ensure.ensure = ()=> false
		root.ensure = $mol_const( ensure )
		const pack = root.pack( root.dir().resolve( `mol/build2/fixture/${ name }` ) )
		return [ ... pack.slice( Slice ).files() ]
			.filter( file => /\/mol\/build2\/(fixture|npm)\//.test( file.path() ) )
			.map( file => file.name() )
			.filter( name => /\.(ts|js)$/.test( name ) && !/\.ts\.js$/.test( name ) )
	}

	$mol_test({

		'web slice skips node sources'() {
			$mol_assert_equal( sources( 'env', $mol_build2_package_slice_web_prod ), [ 'env.ts', 'env.web.ts' ] )
		},

		'node slice skips web sources'() {
			$mol_assert_equal( sources( 'env', $mol_build2_package_slice_node_prod ), [ 'env.ts', 'env.node.ts' ] )
		},

		'prod slice skips dev and test sources'() {
			$mol_assert_equal( sources( 'stage', $mol_build2_package_slice_node_prod ), [ 'stage.ts' ] )
		},

		'test slice takes dev and test sources'() {
			$mol_assert_equal( sources( 'stage', $mol_build2_package_slice_node_test ), [ 'stage.ts', 'stage.dev.ts', 'stage.test.ts' ] )
		},

		'all broken sources are reported at once'() {
			const dir = $node.path.resolve( 'mol/build2/fixture/broken' )
			$node.fs.mkdirSync( dir, { recursive: true } )
			$node.fs.writeFileSync( dir + '/one.ts', 'const one = ;' )
			$node.fs.writeFileSync( dir + '/two.ts', 'const two = ;' )

			try {
				$mol_assert_fail( ()=> sources( 'broken', $mol_build2_package_slice_node_prod ), '2 files failed' )
			} finally {
				$node.fs.rmSync( dir, { recursive: true, force: true } )
			}
		},

		'dependency goes before dependent'() {
			$mol_assert_equal( sources( 'branch', $mol_build2_package_slice_node_prod ), [ 'leaf.ts', 'branch.ts' ] )
		},

		'cycle breaks on weaker nested reference'() {
			$mol_assert_equal( sources( 'cycle/one', $mol_build2_package_slice_node_prod ), [ 'two.ts', 'one.ts' ] )
			$mol_assert_equal( sources( 'cycle/two', $mol_build2_package_slice_node_prod ), [ 'two.ts', 'one.ts' ] )
		},

		'relative imports join slice before importer'() {
			$mol_assert_equal( sources( 'link', $mol_build2_package_slice_node_prod ), [ 'cjs.js', 'esm.ts', 'link.ts' ] )
		},

		'npm registry comes from builder'() {
			$mol_assert_equal( sources( 'registry', $mol_build2_package_slice_node_prod ), [ 'npm.ts', 'npm.node.ts', 'registry.ts' ] )
			$mol_assert_equal( sources( 'registry', $mol_build2_package_slice_web_prod ), [ 'npm.ts', 'npm.web.ts', 'registry.ts' ] )
		},

	})

}
