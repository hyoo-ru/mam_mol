namespace $ {
	$mol_test({
		'sample source mapped lang'( $ ) {

			const source = {
				script1: `1@\n2`,
				script2: `***`
			}

			const span = {
				script1: $mol_span.entire( 'script1', source.script1 ),
				script2: $mol_span.entire( 'script2', source.script2 ),
			}

			const tree = $mol_tree2.list([
				$mol_tree2.struct( 'line', [
					$mol_tree2.data( '"use strict";', [], span.script1.after() ),
					$mol_tree2.data( 'console.log(11);', [], span.script1.slice( 0, 1 ) ),
					$mol_tree2.data( 'console.log(21);', [], span.script2 ),
					$mol_tree2.data( 'console.log(12);', [], span.script1.span( 2, 1, 1 ) ),
				], span.script1 ),
			], span.script1 )

			$mol_assert_like(
				$.$mol_tree2_text_to_string( tree ),
				'"use strict";console.log(11);console.log(21);console.log(12);\n',
			)
			
			$mol_assert_like(
				$.$mol_tree2_text_to_sourcemap( tree ),
				{
					"version": 3,
					"sources": [
						"script1",
						"script2"
					],
					"sourcesContent": [ source.script1, source.script2 ],
					"mappings": "AAAA,AAAI,aAAJ,gBCAA,gBDCA;"
				}
			)

		}
	})
}
