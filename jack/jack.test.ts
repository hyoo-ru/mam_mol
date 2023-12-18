namespace $ {
	$mol_test({

		'test'( $ ) {

			const root: $mol_tree2_belt<{}> = {
				... $mol_jack,
				'foo': input=> [ input.struct( 'FOO' ) ],
				'FOO': input=> [ input.struct( 'FAIL' ) ],
			}

			$mol_assert_like(

				$.$mol_tree2_from_string( `
					test
						case foo
						case tree FOO
				` )
				.hack( root )
				.toString() ,

				$.$mol_tree2_from_string( `
					test
						case foo
						case tree FOO
				` )
				.toString() ,

			)

			$mol_assert_fail(
				()=> $.$mol_tree2_from_string( `
					test
						case \\foo
						case \\bar
				` ).hack( root ),
				'args[0] ≠ args[1]\n\\foo\n\n---\n\\bar\n\ntest\n?#2:6/4'
			)

		} ,

		'jack test'( $ ) {

			const tests = $.$mol_tree2_from_string(`
				test
					name \\commented code
					case
						one
						no two
					case tree
						ONE
				test
					name \\name of struct node as value node
					case type
						one
						\\one
					case tree
						\\ONE
						\\
				test
					name \\kids of struct node
					case kids tree one two
					case tree two
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
							\\two
						three
					case struct
						\\head
						struct \\
						data
							\\one
							\\two
						struct \\three
				test
					name \\evaluated jack code
					case jack head
						one
						two
						three
					case tree ONE
				test
					name \\define and use custom simple macro
					case jack
						hack PI float 3.14
						hack pi PI
						pi
					case float 3.14
				test
					name \\define and use custom macro with arguments
					case jack
						hack tail head reversed from
						tail
							one
							two
							three
					case tree THREE
			`)
			
			const res = tests.hack({

				... $mol_jack.meta ,
				
				// Should processed
				'one' : input => [ input.struct( 'ONE' ) ] ,
				'two' : input => [ input.struct( 'TWO' ) ] ,
				'three' : input => [ input.struct( 'THREE' ) ] ,
				
				// Shouldn't processed
				'ONE' : input => [ input.struct( 'XXX' ) ] ,
				'TWO' : input => [ input.struct( 'XXX' ) ] ,
				'THREE' : input => [ input.struct( 'XXX' ) ] ,

			})

		} ,

	})
}
