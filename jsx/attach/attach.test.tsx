/** @jsx $mol_jsx */
namespace $ {
	
	$mol_test({
		
		'Attach to document'() {

			const doc = $mol_dom_parse( '<html><body id="foo"></body></html>' )

			$mol_jsx_attach( doc , ()=> <body id="foo">bar</body> )

			$mol_assert_equal( doc.documentElement.outerHTML , '<html><body id="foo">bar</body></html>' )
			
		} ,		
		
	})
	
}
