namespace $ {
	
	$mol_test({
		
		'Make html:span'() {
			const dom = $mol_dom_make( '$mol_dom_make_test' ) as HTMLSpanElement
			
			$mol_assert_equal( dom.outerHTML , '<span id="$mol_dom_make_test"></span>' )
		} ,
		
		'Make svg:svg'() {
			const dom = $mol_dom_make( '$mol_dom_make_test' , 'svg' , 'http://www.w3.org/2000/svg' )
			
			$mol_assert_equal( ( dom as HTMLElement ).outerHTML , '<svg id="$mol_dom_make_test"></svg>' )
			//$mol_assert_equal( ( dom as SVGSVGElement ).viewBox.baseVal.width , 0 ) // https://github.com/tmpvar/jsdom/pull/1445
		} ,
		
		'Make to exists element'() {
			const body = $mol_dom_context.document.body
			
			const dom = $mol_dom_make( '$mol_dom_make_test' ) as HTMLSpanElement
			
			try {
				body.appendChild( dom )
				$mol_assert_equal( dom , $mol_dom_make( '$mol_dom_make_test' ) )
			} finally {
				body.removeChild( dom )
			}
		} ,
		
	})
	
}
