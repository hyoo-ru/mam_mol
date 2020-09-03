namespace $.$$ {

	function text( uri : string ) {
		return $mol_charset_decode( $mol_base64_decode( uri.replace( /^.*,/, '' ) ) )
	}

	$mol_test( {
		
		async 'localized - simple'( $ ) {

			const view = text( require( '/mol/view/tree2/ts/test/simple.view.tree.bin' ) )
			const ts = text( require( '/mol/view/tree2/ts/test/simple.view.ts.bin' ) )
			
			const tree = $mol_tree2.fromString( view, $mol_span.entire( 'factory.view.tree', view.length ) )
			const res = $.$mol_view_tree2_ts_compile( tree )
			
			$mol_assert_equal( res.locales['$mol_view_tree2_ts_test_simple_localized'], 'localized value' )
			$mol_assert_equal( res.script, ts )

		},
		
		async 'localized - factory'( $ ) {
			
			const view = text( require( '/mol/view/tree2/ts/test/factory.view.tree.bin' ) )
			const ts = text( require( '/mol/view/tree2/ts/test/factory.view.ts.bin' ) )
			
			const tree = $mol_tree2.fromString( view, $mol_span.entire( 'factory.view.tree', view.length ) )
			const res = $.$mol_view_tree2_ts_compile( tree )
			
			$mol_assert_equal( res.locales['$mol_view_tree2_ts_test_factory_Simple_localized'], 'localized value' )
			$mol_assert_equal( res.script, ts )
			
		},

		async 'compiled'( $ ) {

			const samples = new Map([
				[
					'',
					'',
				],
				[
					text( require( '/mol/view/tree2/ts/test/simple.view.tree.bin' ) ),
					text( require( '/mol/view/tree2/ts/test/simple.view.ts.bin' ) ),
				],
				[
					text( require( '/mol/view/tree2/ts/test/factory.view.tree.bin' ) ),
					text( require( '/mol/view/tree2/ts/test/factory.view.ts.bin' ) ),
				],
				[
					text( require( '/mol/view/tree2/ts/test/array.view.tree.bin' ) ),
					text( require( '/mol/view/tree2/ts/test/array.view.ts.bin' ) ),
				],
				[
					text( require( '/mol/view/tree2/ts/test/dictionary.view.tree.bin' ) ),
					text( require( '/mol/view/tree2/ts/test/dictionary.view.ts.bin' ) ),
				],
				[
					text( require( '/mol/view/tree2/ts/test/multiple_class.view.tree.bin' ) ),
					text( require( '/mol/view/tree2/ts/test/multiple_class.view.ts.bin' ) ),
				],
				[
					text( require( '/mol/view/tree2/ts/test/bind/left.view.tree.bin' ) ),
					text( require( '/mol/view/tree2/ts/test/bind/left.view.ts.bin' ) ),
				],
				[
					text( require( '/mol/view/tree2/ts/test/bind/right.view.tree.bin' ) ),
					text( require( '/mol/view/tree2/ts/test/bind/right.view.ts.bin' ) ),
				],
				[
					text( require( '/mol/view/tree2/ts/test/bind/both.view.tree.bin' ) ),
					text( require( '/mol/view/tree2/ts/test/bind/both.view.ts.bin' ) ),
				],
			])
			
			for( const [ view , ts ] of samples ) {

				const tree = $mol_tree2.fromString( view, $mol_span.entire( 'factory.view.tree', view.length ) )
				const res = $.$mol_view_tree2_ts_compile( tree )

				$mol_assert_equal( res.script, ts )

			}
			
		},

	} )

}
