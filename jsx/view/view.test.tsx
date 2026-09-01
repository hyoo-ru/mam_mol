/** @jsx $mol_jsx */
namespace $ {
	
	$mol_test({
		
		'Class as component'() {

			class Foo extends $mol_jsx_view {

				title = ''
				
				render() {
					return <div>{ this.title } { this.childNodes.join( '-' ) }</div>
				}

			}

			const dom = <Foo id="foo" title="bar">xxx{123}</Foo>

			$mol_assert_equal( dom.outerHTML , '<div id="foo" class="Foo">bar xxx-123</div>' )
			
		} ,
		
		'View by element'() {
			
			let br!: Br
			let brr!: Brr

			class Br extends $mol_jsx_view {

				render() {
					br = this
					return <br id="foo" />
				}

			}

			class Brr extends $mol_jsx_view {

				render() {
					brr = this
					return <Br />
				}

			}

			$mol_assert_equal( Br.of( <Brr /> ) , br )
			$mol_assert_equal( Brr.of( <Brr /> ) , brr )
			
		} ,
		
		async 'Attached view rerender'() {

			const doc = $mol_dom_parse( '<html><body id="foo"></body></html>' )
			
			class Title extends $mol_jsx_view {

				@ $mol_mem
				value( next = 'foo' ) { return next }
				
				render() {
					return <div>{ this.value() }</div>
				}

			}
			
			const dom = $mol_jsx_attach( doc , ()=> <Title id="foo" /> )
			const title = Title.of( dom )
			
			$mol_assert_equal( title.ownerDocument , doc )
			$mol_assert_equal( doc.documentElement.outerHTML , '<html><body id="foo" class="Title">foo</body></html>' )
			
			title.value( 'bar' )
			$mol_wire_fiber.sync()
			
			$mol_assert_equal( doc.documentElement.outerHTML , '<html><body id="foo" class="Title">bar</body></html>' )
			
		} ,
		
		async 'Nested bound views'($) {

			class Task extends $mol_jsx_view {

				@ $mol_mem
				title( next = 'foo' ) { return next }
				
				render() {
					return <h1>{ this.title() }</h1>
				}
				
			}

			class List extends $mol_jsx_view {

				render() {
					return <div class="list">{ ... this.childNodes }</div>
				}
				
			}

			class App extends $mol_jsx_view {
				
				@ $mol_mem
				title( next = '' ) { return next }
				
				render() {
					return (
						<List>
							{ this.title() && <Task id="task" title={ next => this.title( next ) }/> }
						</List>
					)
				}

			}
			
			const doc = $mol_dom_parse( '<html xmlns="http://www.w3.org/1999/xhtml"><body id="root"></body></html>' )
			const root = $.$mol_jsx_attach( doc , ()=> <App $={$} id="root" /> )
			
			$mol_assert_equal(
				$mol_dom_serialize( doc.documentElement ),
				'<html xmlns="http://www.w3.org/1999/xhtml"><body id="root" class="list App List"></body></html>',
			)

			App.of( root ).title( 'barbar' )
			$mol_wire_fiber.sync()
			
			$mol_assert_equal( Task.of( root.firstElementChild! ).title(), 'barbar' )
			$mol_assert_equal(
				doc.documentElement.outerHTML,
				'<html xmlns="http://www.w3.org/1999/xhtml"><body id="root" class="list App List"><h1 id="root/task" class="App_task Task">barbar</h1></body></html>',
			)
			
			Task.of( root.firstElementChild! ).title( 'foofoo' )
			$mol_wire_fiber.sync()
			
			$mol_assert_equal( App.of( root ).title(), 'foofoo' )
			$mol_assert_equal(
				doc.documentElement.outerHTML,
				'<html xmlns="http://www.w3.org/1999/xhtml"><body id="root" class="list App List"><h1 id="root/task" class="App_task Task">foofoo</h1></body></html>',
			)
			
		} ,
		
	})
	
}
