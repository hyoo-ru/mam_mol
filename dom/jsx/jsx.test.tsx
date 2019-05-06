/* @jsx $mol_dom_jsx */
namespace $ {
	
	$mol_test({
		
		'Make empty div'() {
			$mol_assert_equal( (<div/>).outerHTML , '<div></div>' )
		} ,
		
		'Define native field'() {
			
			const dom = <input value={ 123 } /> as HTMLInputElement
			
			$mol_assert_equal( dom.outerHTML , '<input>' )
			$mol_assert_equal( dom.value , '123' )

		} ,
		
		'Define attributes'() {
			
			const dom = <div foo bar="123" />
			
			$mol_assert_equal( dom.outerHTML , '<div foo="true" bar="123"></div>' )

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

			function Button( props : { id : string } , action : string , target : string ) {
				return <button { ... props } >{ action } { target }</button>
			}

			const dom = <Button id="123">click{ 'me' }</Button>

			$mol_assert_equal( dom.outerHTML , '<button id="123">click me</button>' )
			
		} ,
		
	})
	
}
