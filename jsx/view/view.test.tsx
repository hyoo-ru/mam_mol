/** @jsx $mol_jsx_make */
namespace $ {
	
	$mol_test({
		
		'Class as component'() {

			@ $mol_class
			class Foo extends $mol_jsx_view {

				title = ''
				
				render() {
					return <div>{ this.title } { this.childNodes.join( '-' ) }</div>
				}

			}

			const dom = <Foo id="/foo" title="bar">xxx{123}</Foo>

			$mol_assert_equal( dom.outerHTML , '<div id="/foo">bar xxx-123</div>' )
			
		} ,
		
		'View by element'() {

			@ $mol_class
			class Br extends $mol_jsx_view {

				render() {
					view = this
					return <br id="/foo" />
				}

			}

			let view! : Br

			$mol_assert_equal( Br.of( <Br /> ) , view )
			
		} ,
		
		'Attached view rerender'() {

			const doc = $mol_dom_parse( '<html><body id="/foo"></body></html>' )
			
			@ $mol_class
			class Title extends $mol_jsx_view {

				value = 'foo'
				
				render() {
					return <div>{ this.value }</div>
				}

			}
			
			const dom = $mol_jsx_attach( doc , ()=> <Title id="/foo" /> )
			const title = Title.of( dom )
			
			$mol_assert_equal( title.ownerDocument , doc )
			$mol_assert_equal( doc.documentElement.outerHTML , '<html><body id="/foo">foo</body></html>' )
			
			title.value = 'bar'
			title.valueOf()
			
			$mol_assert_equal( doc.documentElement.outerHTML , '<html><body id="/foo">bar</body></html>' )
			
		} ,
		
		async 'Reactive attached view'() {

			const doc = $mol_dom_parse( '<html><body id="/foo"></body></html>' )
			
			@ $mol_class
			class Task {

				@ $mol_atom2_prop
				title( next? : string ) { return next || 'foo' }
				
			}

			@ $mol_class
			class App extends $mol_jsx_view {
				
				@ $mol_atom2_prop
				task() { return new Task }

				@ $mol_atom2_prop
				valueOf() {
					return super.valueOf()
				}
				
				render() {
					return <div>{ this.task().title() }</div>
				}

			}

			const task = new Task

			$mol_atom2_autorun( ()=> $mol_jsx_attach( doc , ()=> <App id="/foo" task={ ()=> task } /> ) )
			
			await $mol_fiber_warp()
			$mol_assert_equal( doc.documentElement.outerHTML , '<html><body id="/foo">foo</body></html>' )

			task.title( 'bar' )
			await $mol_fiber_warp()
			$mol_assert_equal( doc.documentElement.outerHTML , '<html><body id="/foo">bar</body></html>' )
			
		} ,
		
	})
	
}
