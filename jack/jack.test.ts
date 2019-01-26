namespace $ {
	$mol_test({

		'test'() {

			const root : $mol_tree_context = {
				'' : $mol_jack.meta.list ,
				'foo' : ()=> [ new $mol_tree({ type : '777' }) ] ,
				'test' : $mol_jack.meta.test ,
			}

			$mol_assert_equal( $mol_tree.fromString( `
				test
					case foo
					case 777
			` ).hack( root ).toString() , $mol_tree.fromString( `
				test
					case 777
					case 777
			` ).toString() )

			$mol_assert_fail( ()=> $mol_tree.fromString( `
				test
					case foo
					case bar
			` ).hack( root ) )

		} ,

		'jack test'() {

			$mol_tree.fromString(`
				test
					name \\name of struct node as value node
					case type
						int 1
						\\foo
						type float 1.1
					case
						\\int
						\\
						\\
				test
					name \\first element of list
					case head
						one
						two
						three
					case ONE
				test
					name \\list without first element
					case headless
						one
						two
						three
					case
						TWO
						THREE
				test
					name \\reversed list
					case reversed
						one
						two
						three
					case
						THREE
						TWO
						ONE
				test
					name \\quote tree
					name \\tree node by type, value and sub list
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
					case ONE
				test
					name \\define and use custom simple macro
					case jack
						let tree
							tree ambient
							PI tree float 3.14
						out tree PI
					case float 3.14
				tree test
					name \\define and use custom macro with arguments
					case jack
						let
							ambient
							tree tail head reversed from
						out tree tail
							one
							two
							three
					case tree three
			`).hack({
				... $mol_jack.meta ,
				'one' : input => [ input.clone({ type : 'ONE' }) ] ,
				'two' : input => [ input.clone({ type : 'TWO' }) ] ,
				'three' : input => [ input.clone({ type : 'THREE' }) ] ,
			})

		} ,

	})
}
