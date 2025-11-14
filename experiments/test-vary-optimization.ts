// Test script to verify the dictionary tree optimization works correctly
// This tests that the new implementation produces the same results as before

namespace $ {

	// Test basic object shape deduplication
	function test_shape_deduplication() {
		console.log('Testing shape deduplication...')

		// Objects with same shape
		const obj1 = { a: 1, b: 2 }
		const obj2 = { a: 3, b: 4 }

		const packed = $mol_vary.pack([ obj1, obj2 ])
		const unpacked = $mol_vary.take( packed )

		console.log('Original:', [ obj1, obj2 ])
		console.log('Unpacked:', unpacked)
		console.log('Test passed:', JSON.stringify([ obj1, obj2 ]) === JSON.stringify(unpacked))
	}

	// Test custom type registration
	function test_custom_type() {
		console.log('\nTesting custom type registration...')

		class Foo {
			constructor(
				readonly a: number,
				readonly b: number,
			) {}
		}

		$mol_vary.type(
			Foo,
			[ 'a', 'b' ],
			foo => [ foo.a, foo.b ],
			( a = 0, b = 0 ) => new Foo( a, b ),
		)

		const foo = new Foo( 1, 2 )
		const packed = $mol_vary.pack( foo )
		const unpacked = $mol_vary.take( packed )

		console.log('Original:', foo)
		console.log('Unpacked:', unpacked)
		console.log('Is instance of Foo:', unpacked instanceof Foo)
		console.log('Test passed:', unpacked instanceof Foo && (unpacked as Foo).a === 1 && (unpacked as Foo).b === 2)
	}

	// Test nested objects with different shapes
	function test_nested_objects() {
		console.log('\nTesting nested objects...')

		const data = {
			x: { a: 1 },
			y: { b: 2 },
			z: { a: 3 }
		}

		const packed = $mol_vary.pack( data )
		const unpacked = $mol_vary.take( packed )

		console.log('Original:', data)
		console.log('Unpacked:', unpacked)
		console.log('Test passed:', JSON.stringify(data) === JSON.stringify(unpacked))
	}

	// Run all tests
	test_shape_deduplication()
	test_custom_type()
	test_nested_objects()

	console.log('\nAll tests completed!')
}
