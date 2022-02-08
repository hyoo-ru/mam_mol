/** @jsx $mol_jsx */
namespace $ {
	$mol_test({
		
		'bool'() {
			
			const bold = new $mol_xpath( '//b' )
			
			$mol_assert_ok( bold.bool( <div><b/></div> ) )
			$mol_assert_not( bold.bool( <div><i/></div> ) )
			
		},
		
		'numb'() {
			
			const bold = new $mol_xpath( 'count(//b)' )
			
			$mol_assert_equal( bold.numb( <div><b/></div> ), 1 )
			$mol_assert_equal( bold.numb( <div><b><b/></b></div> ), 2 )
			$mol_assert_equal( bold.numb( <div><i/></div> ), 0 )
			
		},
		
		'str'() {
			
			const bold = new $mol_xpath( '//b' )
			
			$mol_assert_equal( bold.str( <div>foo<b>bar</b>lol<b>777</b></div> ), 'bar' )
			$mol_assert_equal( bold.str( <div>foo<i>bar</i>lol</div> ), '' )
			
		},
		
		'first'() {
			
			const bold = new $mol_xpath( '//b' )
			
			$mol_assert_equal( bold.first( <div>foo<b>bar</b>lol<b>777</b></div> )!.textContent, 'bar' )
			$mol_assert_equal( bold.first( <div>foo<i>bar</i>lol</div> ), null )
			
		},
		
		'all'() {
			
			const bold = new $mol_xpath( '//b' )
			
			$mol_assert_like( [ ... bold.all( <div>foo<b>bar</b>lol<b>777</b></div> ) ].map( el => el.textContent ), [ 'bar', '777' ] )
			$mol_assert_like( [ ... bold.all( <div>foo<i>bar</i>lol<i>777</i></div> ) ].map( el => el.textContent ), [] )
			
		},
		
	})
}
