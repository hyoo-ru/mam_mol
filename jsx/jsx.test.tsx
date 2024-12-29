/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
namespace $ {
	
	$mol_test({
		
		'Make empty div'() {
			$mol_assert_equal( (<div/>).outerHTML , '<div></div>' )
		} ,
		
		'Define native field'() {
			
			const dom = <input value='123' /> as HTMLInputElement
			
			$mol_assert_equal( dom.outerHTML, '<input value="123">' )
			$mol_assert_equal( dom.value, '123' )

		} ,
		
		'Define classes'() {
			
			const dom = <div class={ 'foo bar' } />
			
			$mol_assert_equal( dom.outerHTML, '<div class="foo bar"></div>' )

		} ,
		
		'Define styles'() {
			
			const dom = <div style={{ color: 'red' }} />
			
			$mol_assert_equal( dom.outerHTML, '<div style="color: red;"></div>' )

		} ,
		
		'Define dataset'() {
			
			const dom = <div dataset={{ foo: 'bar' }} />
			
			$mol_assert_equal( dom.outerHTML, '<div data-foo="bar"></div>' )

		} ,
		
		'Define attributes'() {
			
			const dom = <div lang="ru" hidden />
			
			$mol_assert_equal( dom.outerHTML, '<div lang="ru" hidden=""></div>' )

		} ,
		
		'Define child nodes'() {

			const dom =
				<div>
					hello
					<strong>world</strong>
					!
				</div>
			
			$mol_assert_equal( dom.outerHTML, '<div>hello<strong>world</strong>!</div>' )

		} ,

		'Make fragment'() {

			const dom =
				<>
					<br />
					<hr />
				</>
			
			$mol_assert_equal( $mol_dom_serialize( dom ), '<br xmlns="http://www.w3.org/1999/xhtml" /><hr xmlns="http://www.w3.org/1999/xhtml" />' )

		} ,

		'Spread fragment'() {

			const dom =
				<div>
					<>
						<br />
						<hr />
					</>
				</div>
			
			$mol_assert_equal( dom.outerHTML, '<div><br><hr></div>' )

		} ,

		'Function as component'() {

			const Button = (
				props: { hint: string },
				target: ()=> string,
			) => {
				return <button title={ props.hint } >{ target() }</button>
			}

			const dom = <Button id="foo" hint="click me">{ ()=> 'hey!' }</Button>

			$mol_assert_equal( dom.outerHTML, '<button id="foo" title="click me" class="Button">hey!</button>' )
			
		} ,
		
		'Nested guid generation'() {

			const Foo = ()=> {
				return <div>
					<Bar id="bar">
						<img id="icon" />
					</Bar>
				</div>
			}

			const Bar = ( props: {}, icon: Element )=> {
				return <span>{ icon }<i id="label"/></span>
			}

			const dom = <Foo id="foo" />

			$mol_assert_equal( dom.outerHTML, '<div id="foo" class="Foo"><span id="foo/bar" class="Foo_bar Bar"><img id="foo/icon" class="Foo_icon"><i id="foo/bar/label" class="Foo_bar_label Bar_label"></i></span></div>' )
			
		} ,
		
		'Fail on non unique ids'() {

			const App = ()=> {
				return <div>
					<span id="bar" />
					<span id="bar" />
				</div>
			}

			$mol_assert_fail( ()=> <App id="foo" />, 'JSX already has tag with id "foo/bar"' )
			
		} ,
		
		'Owner based guid generationn'() {

			const Foo = ()=> {
				return <div>
					<Bar id="middle" icon={ ()=> <img id="icon" /> } />
				</div>
			}

			const Bar = ( props: { icon: ()=> Element } )=> {
				return <span>{ props.icon() }</span>
			}

			const dom = <Foo id="app" />

			$mol_assert_equal( dom.outerHTML, '<div id="app" class="Foo"><span id="app/middle" class="Foo_middle Bar"><img id="app/icon" class="Foo_icon"></span></div>' )
			
		} ,
		
		'Fail on same ids from different caller'() {

			const Foo = ()=> {
				return <div>
					<img id="icon" />
					<Bar id="bar" icon={ ()=> <img id="icon" /> } />
				</div>
			}

			const Bar = ( props: { icon: ()=> Element } )=> {
				return <span>{ props.icon() }</span>
			}

			$mol_assert_fail( ()=> <Foo id="foo" />, 'JSX already has tag with id "foo/icon"' )
			
		} ,
		
	})
	
}
