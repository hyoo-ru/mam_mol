namespace $ {
	$mol_test({
		'buffer from utf8 string'() {
			const str = 'Hello, ΧΨΩЫ'
			const buffer = $mol_buffer.create(str)

			$mol_assert_equal( buffer.toString(), str )
		},

		'buffer length equals binary string length'() {
			const str = 'Hello, ΧΨΩЫ'
			const buffer = $mol_buffer.create(str)

			$mol_assert_equal( buffer.length, 15 )
		},

		'buffer base64 encode'() {
			const str = 'Hello, ΧΨΩЫ'
			const buffer = $mol_buffer.create(str)

			$mol_assert_equal( buffer.toString('base64'), 'SGVsbG8sIM6nzqjOqdCr' )
		},

		'buffer base64 decode'() {
			const str = 'GgoASUh42g=='
			const buffer = $mol_buffer.create(str, 'base64')

			$mol_assert_like( buffer, new Uint8Array([26,10,0,73,72,120,218]))
		},

		'buffer conform from same string are equal'() {

			const source = $mol_buffer.create('123')
			const target = $mol_buffer.create('123')

			const result = $mol_conform( target , source )

			$mol_assert_equal( result , source )
		} ,

		'buffer conform from different string are not equal'() {

			const source = $mol_buffer.create('123')
			const target = $mol_buffer.create('1234')

			const result = $mol_conform( target , source )

			$mol_assert_ok( result !== source )
		} ,

		'buffer conform from same Uint8Array are equal'() {

			const source = $mol_buffer.create(new Uint8Array([12, 13, 5]))
			const target = $mol_buffer.create(new Uint8Array([12, 13, 5]))

			const result = $mol_conform( target , source )

			$mol_assert_equal( result , source )
		} ,

		'buffer conform from different Uint8Array are not equal'() {

			const source = $mol_buffer.create(new Uint8Array([12, 13]))
			const target = $mol_buffer.create(new Uint8Array([12, 13, 5]))

			const result = $mol_conform( target , source )

			$mol_assert_ok( result !== source )
		} ,
	})
}
