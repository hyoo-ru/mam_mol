namespace $ {
	$mol_test({
		'summ'( $ ) {

			const source = {
				script1: `1@\n2`,
				script2: `***`
			}

			const tree = $mol_tree2.list([
				$mol_tree2.data( '"use strict";', [], $mol_span.end( 'script1', source.script1.length ) ),
				$mol_tree2.data( 'console.log(11);', [], new $mol_span( 'script1', 0, 0, 1 ) ),
				$mol_tree2.data( 'console.log(21);', [], new $mol_span( 'script2', 0, 0, 3 ) ),
				$mol_tree2.data( 'console.log(12);', [], new $mol_span( 'script1', 1, 0, 1 ) ),
			])

			$mol_assert_like(
				$mol_tree2_text_to_string( tree ),
				'"use strict";console.log(11);console.log(21);console.log(12);',
			)

			$mol_assert_like(
				$mol_tree2_text_to_sourcemap( tree ),
				{
					"version": 3,
					"sources": [
						"script1",
						"script2"
					],
					"mappings": "AAAI,aAAJ,gBCAA,gBDCA;"
				}
			)

		}
	})
}
