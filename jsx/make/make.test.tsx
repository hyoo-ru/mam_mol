/** @jsx $mol_jsx_make */
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
		
		'Define classes'() {
			
			const dom = <div classList={[ 'foo bar' ]} />
			
			$mol_assert_equal( dom.outerHTML , '<div class="foo bar"></div>' )

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
			
			const dom = <div lang="ru" hidden />
			
			$mol_assert_equal( dom.outerHTML , '<div lang="ru" hidden=""></div>' )

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

			const Button = ( { hint } : { hint : string } , target : ()=> string ) => {
				return <button title={ hint } >{ target() }</button>
			}

			const dom = <Button id="/foo" hint="click me">{ ()=> 'hey!' }</Button>

			$mol_assert_equal( dom.outerHTML , '<button title="click me" id="/foo">hey!</button>' )
			
		} ,
		
		// 'Standart classes as component'() {

		// 	const dom = <HTMLButtonElement id="/foo" title="click me">hey!</HTMLButtonElement>

		// 	$mol_assert_equal( dom.outerHTML , '<button title="click me" id="/foo">hey!</button>' )
			
		// } ,
		
		'Nested guid generation'() {

			const Foo = ()=> {
				return <div>
					<Bar id="/bar">
						<img id="/icon" />
					</Bar>
				</div>
			}

			const Bar = ( props : {} , icon : Element )=> {
				return <span>{ icon }</span>
			}

			const dom = <Foo id="/foo" />

			$mol_assert_equal( dom.outerHTML , '<div id="/foo"><span id="/foo/bar"><img id="/foo/icon"></span></div>' )
			
		} ,
		
		'Fail on non unique ids'() {

			const App = ()=> {
				return <div>
					<span id="/bar" />
					<span id="/bar" />
				</div>
			}

			$mol_assert_fail( ()=> <App id="/foo" /> , 'JSX already has tag with id "/bar"' )
			
		} ,
		
	})
	
}
