namespace $ {

	function artifacts( name: string, Bundle: typeof $mol_build2_bundle, Slice: typeof $mol_build2_package_slice ) {
		const root = new $mol_build2_root
		const ensure = new $mol_build2_root_ensure
		ensure.ensure = ()=> false
		root.ensure = $mol_const( ensure )
		const pack = root.pack( root.dir().resolve( `mol/build2/fixture/${ name }` ) )
		return root.bundle( Bundle ).artifacts( pack.slice( Slice ) )
	}

	function npm_pack( name: string ) {
		const root = new $mol_build2_root
		const ensure = new $mol_build2_root_ensure
		ensure.ensure = ()=> false
		root.ensure = $mol_const( ensure )
		const pack = root.pack( root.dir().resolve( `mol/build2/fixture/${ name }` ) )
		for( const slice of pack.slices() ) slice.npm_install = ()=> {}
		return pack
	}

	function npm_deps( name: string ) {
		const pack = npm_pack( name )
		const target = pack.dir().resolve( 'package.json' )
		$node.fs.rmSync( target.path(), { force: true } )
		pack.root().bundle( $mol_build2_bundle_npm_deps ).pack_artifacts( pack )
		if( !target.exists() ) return null
		return JSON.parse( target.text() )
	}

	function npm_packages( name: string ) {
		const pack = npm_pack( name )
		return [ ... pack.slice( $mol_build2_package_slice_web_prod ).graph().nodes ]
			.map( file => file.relate( pack.root().dir() ) )
			.filter( path => /node_modules\/[^/]+\/package\.json$/.test( path ) )
			.sort()
	}

	$mol_test({

		'view tree compiles into js bundle'() {
			const script = artifacts( 'view', $mol_build2_bundle_js, $mol_build2_package_slice_node_prod ).find( file => file.name() === 'node.js' )
			$mol_assert_equal( /class \$?mol_build2_fixture_view\b/.test( script?.text() ?? '' ), true )
			$mol_assert_equal( script?.text().includes( 'build2 view fixture' ), true )
		},

		'deploy copies listed files'() {
			const copied = artifacts( 'build', $mol_build2_bundle_files, $mol_build2_package_slice_web_prod )
			const target = copied.find( file => /fixture\/build\/static\.txt$/.test( file.path() ) )
			$mol_assert_equal( target?.text(), 'deploy-ok\n' )
		},

		'relative imports link esm, commonjs and fqn code'() {
			const script = artifacts( 'link', $mol_build2_bundle_js, $mol_build2_package_slice_node_prod ).find( file => file.name() === 'node.js' )
			const context = $node.vm.createContext({ module: {}, require, console, process })
			$node.vm.runInContext( script?.text() ?? '', context )
			$mol_assert_equal( context[ '$' + 'mol_build2_fixture_link' ](), 4 )
		},

		'entry point package json lists npm packages of whole bundle'() {
			const json = npm_deps( 'npm/app' )
			$mol_assert_equal( Object.keys( json.dependencies ), [ 'esbuild', 'typescript' ] )
			$mol_assert_equal( Object.keys( json.devDependencies ), [ 'jsdom' ] )
			$mol_assert_equal( json.scripts.start, 'cd ../../../../.. && npx mam mol/build2/start && node mol/build2/start/-/node.js mol/build2/fixture/npm/app' )
		},

		'package json not created without entry point'() {
			$mol_assert_equal( npm_deps( 'npm/bare' ), null )
		},

		'entry point resolves npm packages from own node modules'() {
			$mol_assert_equal( npm_packages( 'npm/app' ), [
				'mol/build2/fixture/npm/app/node_modules/esbuild/package.json',
				'mol/build2/fixture/npm/app/node_modules/typescript/package.json',
			] )
			$mol_assert_equal( npm_packages( 'npm/bare' ), [ 'node_modules/esbuild/package.json' ] )
		},

	})

}
