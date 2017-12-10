namespace $ {
	
	$mol_test({
		
		'Make empty div'() {
			$mol_assert_equal( (<div/>).outerHTML , '<div></div>' )
		} ,
		
		'Make input with id and value'() {
			const dom = <input id="$mol_dom_jsx_test" value={ 123 } /> as HTMLInputElement
			
			$mol_assert_equal( dom.outerHTML , '<input id="$mol_dom_jsx_test">' )
			$mol_assert_equal( dom.value , '123' )
		} ,
		
		'Make content'() {
			const id = '$mol_dom_jsx_test'
			
			const dom =
				<div>
					hello
					<strong>world</strong>
					!
				</div>
			
			$mol_assert_equal(
				dom.outerHTML ,
				'<div>' +
					'hello' +
					'<strong>world</strong>' +
					'!' +
				'</div>'
			)
		} ,

		'Make to exists element'() {
			const dom1 = <div id="$mol_dom_jsx_test" />
			$mol_dom_context.document.body.appendChild( dom1 )
			
			const dom2 = <div id="$mol_dom_jsx_test">hello</div>
			$mol_dom_context.document.body.removeChild( dom1 )
			
			$mol_assert_equal( dom1 , dom2 )
			$mol_assert_equal( dom1.outerHTML , '<div id="$mol_dom_jsx_test">hello</div>' )
		} ,

		'Pure function as component'() {

			function Button( props : { id : string , text : string } ) {
				return <button id={ props.id }>{ props.text }</button>
			}

			const dom = <Button id="$mol_dom_jsx_test" text="click me" />

			$mol_assert_equal( dom.outerHTML , '<button id="$mol_dom_jsx_test">click me</button>' )
		} ,
		
	})
	
}
