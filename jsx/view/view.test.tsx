/** @jsx $mol_jsx_make */
namespace $ {
	
	$mol_test({
		
		'Class as component'() {

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
		
		async 'Reactive attached view'($) {

			const doc = $mol_dom_parse( '<html><body id="/foo"></body></html>' )
			
			class Task extends $mol_object2 {

				@ $mol_mem
				title( next? : string ) { return next || 'foo' }
				
			}

			class App extends $mol_jsx_view {
				
				@ $mol_mem
				task() { return new Task }

				@ $mol_mem
				valueOf() {
					return super.valueOf()
				}
				
				render() {
					return <div>{ this.task().title() }</div>
				}

			}

			const task = new Task
			task.$ = $

			const autorun = $.$mol_atom2_autorun( ()=> $mol_jsx_attach( doc , ()=> <App $={$} id="/foo" task={ ()=> task } /> ) )
			autorun.$ = $
			
			await $mol_fiber_warp()
			$mol_assert_equal( doc.documentElement.outerHTML , '<html><body id="/foo">foo</body></html>' )

			task.title( 'bar' )
			await $mol_fiber_warp()
			$mol_assert_equal( doc.documentElement.outerHTML , '<html><body id="/foo">bar</body></html>' )
			
		} ,
		
	})
	
}
