namespace $ {
	$mol_test({

		'test'() {

			const root : $mol_tree_context = {
				'' : $mol_jack.meta.list ,
				'foo' : ()=> [ new $mol_tree({ type : '777' }) ] ,
				'test' : $mol_jack.meta.test ,
			}

			$mol_assert_like(

				$mol_tree.fromString( `
					test
						case foo
						case 777
				` )
				.hack( root )
				.toString() ,

				$mol_tree.fromString( `
					test
						case foo
						case 777
				` )
				.toString() ,

			)

			$mol_assert_fail( ()=> {
				$mol_tree.fromString( `
					test
						case \foo
						case \bar
				` )
				.hack( root )
			} )

		} ,

		'jack test'() {

			const tests = $mol_tree.fromString(`
				test
					name \\name of struct node as value node
					case type
						one
						\\one
					case tree
						\\ONE
						\\
				test
					name \\first element of list
					case head
						one
						two
						three
					case tree ONE
				test
					name \\list without first element
					case headless
						one
						two
						three
					case tree
						TWO
						THREE
				test
					name \\reversed list
					case reversed
						one
						two
						three
					case tree
						THREE
						TWO
						ONE
				test
					name \\quote tree
					name \\make tree node by type, value and sub list
					case tree head
						\\
						\\one
						two
					case make
						type \\head
						sub
							make
							make value type tree one
							make type type tree two
				test
					name \\evaluated jack code
					case jack
						let ambient
						out tree head
							one
							two
							three
					case tree ONE
				test
					name \\define and use custom simple macro
					case jack
						let tree
							tree ambient
							PI tree float 3.14
							pi PI
						out tree pi
					case tree float 3.14
				tree test
					name \\define and use custom macro with arguments
					case jack
						let tree tail head reversed from
						out tree tail tree
							one
							two
							three
					case tree THREE
			`)
			
			const res = tests.hack({

				... $mol_jack.meta ,
				
				// Should processed
				'one' : input => [ input.clone({ type : 'ONE' }) ] ,
				'two' : input => [ input.clone({ type : 'TWO' }) ] ,
				'three' : input => [ input.clone({ type : 'THREE' }) ] ,
				
				// Shouldn't processed
				'ONE' : input => [ input.clone({ type : 'XXX' }) ] ,
				'TWO' : input => [ input.clone({ type : 'XXX' }) ] ,
				'THREE' : input => [ input.clone({ type : 'XXX' }) ] ,

			})

		} ,

	})
}
