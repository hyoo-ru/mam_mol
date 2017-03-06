namespace $ {
	
	$mol_test({
		
		'Make empty div'() {
			const dom = $mol_dom_make({
				id : '$mol_dom_make_test' ,
			}) as HTMLSpanElement
			
			$mol_assert_equal( dom.outerHTML , '<span id="$mol_dom_make_test"></span>' )
		} ,
		
		'Make SVG'() {
			const dom = $mol_dom_make({
				id : '$mol_dom_make_test' ,
				localName : 'svg' ,
				namespaceURI : 'http://www.w3.org/2000/svg' ,
			})
			
			$mol_assert_equal( ( dom as HTMLElement ).outerHTML , '<svg id="$mol_dom_make_test"></svg>' )
			//$mol_assert_equal( ( dom as SVGSVGElement ).viewBox.baseVal.width , 0 ) // https://github.com/tmpvar/jsdom/pull/1445
		} ,
		
		'Make input with id and value'() {
			const dom = $mol_dom_make({
				id : '$mol_dom_make_test' ,
				localName : 'input' ,
				value : 123 ,
			}) as HTMLInputElement
			
			$mol_assert_equal( dom.outerHTML , '<input id="$mol_dom_make_test">' )
			$mol_assert_equal( dom.value , '123' )
		} ,
		
		'Make content'() {
			const id = '$mol_dom_make_test'
			const dom = $mol_dom_make({
				id : `${ id }` ,
				childNodes : [
					'hello' , // string
					$mol_dom_make({ // Node
						id : `${ id }_inner` ,
					}) ,
					'!' ,
				]
			}) as HTMLSpanElement
			
			$mol_assert_equal(
				dom.outerHTML ,
				'<span id="$mol_dom_make_test">' +
					'hello' +
					'<span id="$mol_dom_make_test_inner"></span>' +
					'!' +
				'</span>'
			)
		} ,
		
		'Make to exists element'() {
			const dom1 = $mol_dom_make({
				id : '$mol_dom_make_test' ,
			}) as HTMLSpanElement
			$mol_dom_context.document.body.appendChild( dom1 )
			
			const dom2 = $mol_dom_make({
				id : '$mol_dom_make_test' ,
				className : 'mol_dom_make_test'
			}) as HTMLSpanElement
			$mol_dom_context.document.body.removeChild( dom1 )
			
			$mol_assert_equal( dom1 , dom2 )
			$mol_assert_equal( dom1.outerHTML , '<span id="$mol_dom_make_test" class="mol_dom_make_test"></span>' )
		} ,
		
		'Make by another dom element'() {
			const dom1 = $mol_dom_make({
				id : '$mol_dom_make_test' ,
				className : 'hello' ,
				childNodes : [
					'world'
				] ,
			}) as HTMLSpanElement
			
			const dom2 = $mol_dom_make({
				id : dom1.id ,
				className : dom1.className ,
				childNodes : dom1.childNodes ,
			}) as HTMLSpanElement
			
			$mol_assert_equal( dom2.outerHTML , '<span id="$mol_dom_make_test" class="hello">world</span>' )
		} ,
		
	})
	
}
