/* @jsx $mol_dom_jsx */
namespace $ {
	
	$mol_test({
		
		'Make empty div'() {
			$mol_assert_equal( (<div/>).outerHTML , '<div></div>' )
		} ,
		
		'Define native field'() {
			
			const dom = <input value='123' /> as HTMLInputElement
			
			$mol_assert_equal( dom.outerHTML , '<input value="123">' )
			$mol_assert_equal( dom.value , '123' )

		} ,
		
		'Define styles'() {
			
			const dom = <div style={{ color : 'red' }} />
			
			$mol_assert_equal( dom.outerHTML , '<div style="color: red;"></div>' )

		} ,
		
		'Define dataset'() {
			
			const dom = <div dataset={{ foo : 'bar' }} />
			
			$mol_assert_equal( dom.outerHTML , '<div data-foo="bar"></div>' )

		} ,
		
		'Define attributes'() {
			
			const dom = <div hidden lang="ru" />
			
			$mol_assert_equal( dom.outerHTML , '<div hidden="" lang="ru"></div>' )

		} ,
		
		'Define child nodes'() {

			const dom =
				<div>
					hello
					<strong>world</strong>
					!
				</div>
			
			$mol_assert_equal( dom.outerHTML , '<div>hello<strong>world</strong>!</div>' )

		} ,

		'Function as component'() {

			function Button( { id , ... props } : { id : string } , action : string , target : ()=> string ) {
				return <button id="root" { ... props } >{ action }{ target() }</button>
			}

			const dom = <Button id="foo">click { ()=> 'me' }</Button>

			$mol_assert_equal( dom.outerHTML , '<button id="foo.root">click me</button>' )
			
		} ,
		
	})
	
}
