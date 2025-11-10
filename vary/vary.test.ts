namespace $.$$ {
	
	const { uint, link, spec, blob, text, list, tupl, sint } = $mol_vary_tip
	const { none, both, fp16, fp32, fp64 } = $mol_vary_spec
	const { "1": l1, "2": l2, "4": l4, "8": l8 } = $mol_vary_len
	const str = $mol_charset_encode
	
	function check( vary: unknown, ideal: readonly number[] ) {
		const pack = $mol_vary.pack( vary )
		$mol_assert_equal( pack, new Uint8Array( ideal ) )
		$mol_assert_equal( $mol_vary.take( pack ), vary )
	}
	
	$mol_test({

		"vary pack logical"( $ ) {
			check( null, [ spec|none ] )
			check( true, [ $mol_vary_spec.true ] )
			check( false, [ $mol_vary_spec.fake ] )
			check( undefined, [ spec|both ] )
		},

		"vary pack special floats"( $ ) {
			check( NaN, [ fp64, ... new Uint8Array( new Float64Array([ NaN ]).buffer ) ] )
			check( Infinity, [ fp64, ... new Uint8Array( new Float64Array([ Infinity ]).buffer ) ] )
			check( -Infinity, [ fp64, ... new Uint8Array( new Float64Array([ -Infinity ]).buffer ) ] )
		},
		
		"vary pack uint0"( $ ) {
			check( 0, [ 0 ] )
			check( 27, [ 27 ] )
		},
		
		"vary pack uint1"( $ ) {
			check( 28, [ uint|l1, 28 ] )
			check( 255 , [ uint|l1, 255 ] )
		},
		
		"vary pack uint2"( $ ) {
			check( 256, [ uint|l2, 0, 1 ] )
			check( 256**2-1, [ uint|l2, 255, 255 ] )
		},
		
		"vary pack uint4"( $ ) {
			check( 256**2, [ uint|l4, 0, 0, 1, 0 ] )
			check( 256**4-1, [ uint|l4, 255, 255, 255, 255 ] )
		},
		
		"vary pack uint8"( $ ) {
			check( 256**4, [ uint|l8, 0, 0, 0, 0, 1, 0, 0, 0 ] )
			check( Number.MAX_SAFE_INTEGER, [ uint|l8, 255, 255, 255, 255, 255, 255, 31, 0 ] )
			check( 256n**8n-1n, [ uint|l8, 255, 255, 255, 255, 255, 255, 255, 255 ] )
		},
		
		"vary pack sint0"( $ ) {
			check( -1, [ -1 ] )
			check( -28, [ -28 ] )
		},
		
		"vary pack sint1"( $ ) {
			check( -29, [ sint|~l1, -29 ] )
			check( -256/2 , [ sint|~l1, 128 ] )
		},
		
		"vary pack sint2"( $ ) {
			check( -256/2-1, [ sint|~l2, 127, 255 ] )
			check( -(256**2)/2, [ sint|~l2, 0, 128 ] )
		},
		
		"vary pack sint4"( $ ) {
			check( -(256**2)/2-1, [ sint|~l4, 255, 127, 255, 255 ] )
			check( -(256**4)/2, [ sint|~l4, 0, 0, 0, 128 ] )
		},
		
		"vary pack sint8"( $ ) {
			check( -(256**4)/2-1, [ sint|~l8, 255, 255, 255, 127, 255, 255, 255, 255 ] )
			check( Number.MIN_SAFE_INTEGER, [ sint|~l8, 1, 0, 0, 0, 0, 0, 224, 255 ] )
			check( -(256n**8n)/2n, [ sint|~l8, 0, 0, 0, 0, 0, 0, 0, 128 ] )
		},
		
		"vary pack float"( $ ) {
			check( 1.5, [ fp64,  ... new Uint8Array( new Float64Array([ 1.5 ]).buffer ) ] )
		},
		
		"vary pack list"( $ ) {
			check(
				[ 1, 2, 3 ],
				[ list|3, 1, 2, 3 ],
			)
			check(
				[ [], [1], [2,3] ],
				[ list|3, list|0, list|1, 1, list|2, 2, 3 ],
			)
		},
		
		"vary pack dedup list"( $ ) {
			const pair = [ 1, 2 ]
			check(
				[ pair, pair ],
				[ list|2, list|2, 1, 2, link|0 ],
			)
			const seven = [7]
			const box = [seven]
			check(
				[ box, box, seven ],
				[ list|3, list|1, list|1, 7, link|1, link|0 ],
			)
		},
		
		"vary pack text"( $ ) {
			check( '', [ text|0 ] )
			check( 'foo', [ text|3, ... str('foo') ] )
			const long = 'abcdefghijklmnopqrstuvwxyzЖЫ'
			check( long, [ text|l1, 28, ... str(long) ] )
		},

		"vary pack text unicode"( $ ) {
			const emoji1 = '🎉' // length 2 (surrogate pair)
			const emoji2 = '你好' // length 2
			const emoji3 = '🔥✨💡' // length 5 (multiple surrogate pairs)
			check( emoji1, [ text|emoji1.length, ... str(emoji1) ] )
			check( emoji2, [ text|emoji2.length, ... str(emoji2) ] )
			check( emoji3, [ text|emoji3.length, ... str(emoji3) ] )
		},
		
		"vary pack dedup text"( $ ) {
			check(
				[ "f", "f" ],
				[ list|2, text|1, ... str('f'), link|0 ],
			)
		},
		
		"vary pack blob"( $ ) {
			check(
				new Uint8Array([ 1, 255 ]),
				[ blob|2, uint|l1, 1, 255 ],
			)
			check(
				new Int8Array([ -128, 127 ]),
				[ blob|2, sint|~l1, -128, 127 ],
			)
			check(
				new Uint16Array([ 255 ]),
				[ blob|2, uint|l2, 255, 0 ],
			)
			check(
				new Int16Array([ -128 ]),
				[ blob|2, sint|~l2, -128, 255 ],
			)
			check(
				new Uint32Array([ 255 ]),
				[ blob|4, uint|l4, 255, 0, 0, 0 ],
			)
			check(
				new Int32Array([ -128 ]),
				[ blob|4, sint|~l4, -128, 255, 255, 255 ],
			)
			check(
				new BigUint64Array([ 255n ]),
				[ blob|8, uint|l8, 255, 0, 0, 0, 0, 0, 0, 0 ],
			)
			check(
				new BigInt64Array([ -128n ]),
				[ blob|8, sint|~l8, -128, 255, 255, 255, 255, 255, 255, 255 ],
			)
			check(
				new Float32Array([ 1.5 ]),
				[ blob|4, fp32, ... new Uint8Array( new Float32Array([ 1.5 ]).buffer ) ],
			)
			check(
				new Float64Array([ 1.5 ]),
				[ blob|8, fp64, ... new Uint8Array( new Float64Array([ 1.5 ]).buffer ) ],
			)
		},

		"vary pack blob empty"( $ ) {
			check(
				new Uint8Array([]),
				[ blob|0, uint|l1 ],
			)
			check(
				new Float32Array([]),
				[ blob|0, fp32 ],
			)
		},
		
		"vary pack dedup blob"( $ ) {
			const part = new Uint8Array([ 1, 2 ])
			check(
				[ part, part ],
				[ list|2, blob|2, uint|l1, 1, 2, link|0 ],
			)
		},
		
		"vary pack struct"( $ ) {
			check(
				{ a: 1, b: 2 },
				[ tupl|2, text|1, ... str('a'), text|1, ... str('b'), 1, 2 ],
			)
			check(
				{ x: {}, y: { a: 1 } },
				[ tupl|2, text|1, ... str('x'), text|1, ... str('y'), tupl|0, tupl|1, text|1, ... str('a'), 1 ],
			)
		},
		
		// disabled because too slow
		// "vary pack struct shape dedup"( $ ) {
		// 	check(
		// 		[ {}, { foo: 1 }, { foo: 2 } ],
		// 		[ list|3, tupl|0, list|0, tupl|1, list|1, text|3, ... str('foo'), 1, tupl|1, link|1, 2 ],
		// 	)
		// 	check(
		// 		{ x: 1, y: { x: 2, y: 3 } },
		// 		[ tupl|2, list|2, text|1, ... str('x'), text|1, ... str('y'), 1, tupl|2, link|2, 2, 3 ],
		// 	)
		// },
		
		"vary pack struct full dedup"( $ ) {
			const item = { x: 1 }
			check(
				[ item, item ],
				[ list|2,  tupl|1, text|1, ... str('x'), 1, link|1 ],
			)
			// check(
			// 	{ x: { x: 1, y : 2 }, y: { x: 1, y : 2 } },
			// 	[ tupl|2, list|2, text|1, ... str('x'), text|1, ... str('y'), tupl|2, link|2, 1, 2, link|3 ],
			// )
		},
		
		"vary pack Map"( $ ) {

			check(
				new Map< any, any >([ [ 'foo', 1 ], [ 2, 'bar' ] ]),
				[ tupl|2, text|4, ... str('keys'), text|4, ... str('vals'), list|2, text|3, ... str('foo'), 2, list|2, 1, text|3, ... str('bar') ],
			)

		},

		"vary pack Map empty"( $ ) {
			check(
				new Map(),
				[ tupl|2, text|4, ... str('keys'), text|4, ... str('vals'), list|0, list|0 ],
			)
		},
		
		"vary pack Set"( $ ) {

			check(
				new Set([ 7, 'foo' ]),
				[ tupl|1, text|3, ... str('set'), list|2, 7, text|3, ... str('foo') ],
			)

		},

		"vary pack Set empty"( $ ) {
			check(
				new Set(),
				[ tupl|1, text|3, ... str('set'), list|0 ],
			)
		},
		
		"vary pack Date"( $ ) {
			
			const date = new Date( '2025-01-02T03:04:05.678' )
			check(
				date,
				[ tupl|1, text|9, ... str('unix_time'), fp64, ... new Uint8Array( new Float64Array([ date.valueOf() / 1000 ]).buffer ) ],
			)
			
		},
		
		"vary pack custom class"( $ ) {

			class Foo {

				constructor(
					readonly a: number,
					readonly b: number,
				) {}

				;[ Symbol.iterator ]() { // deep comparable
					return [ this.a, this.b ].values()
				}

			}

			$mol_vary.type(
				[ 'a', 'b' ],
				( a = 0, b = 0 )=> new Foo( a, b ),
				foo => [ foo.a, foo.b ],
			)

			check(
				new Foo( 1, 2 ),
				[ tupl|2, text|1, ... str('a'), text|1, ... str('b'), 1, 2 ],
			)

		},

		"vary pack list empty"( $ ) {
			check( [], [ list|0 ] )
		},

		"vary pack struct empty"( $ ) {
			check( {}, [ tupl|0 ] )
		},

		"vary pack nested mixed"( $ ) {
			check(
				{ a: [ 1, 2, { b: 'test' } ], c: true },
				[ tupl|2, text|1, ... str('a'), text|1, ... str('c'), list|3, 1, 2, tupl|1, text|1, ... str('b'), text|4, ... str('test'), $mol_vary_spec.true ],
			)
		},

		"vary pack deeply nested"( $ ) {
			check(
				[ [ [ [ 1 ] ] ] ],
				[ list|1, list|1, list|1, list|1, 1 ],
			)
		},

		"vary pack mixed types in list"( $ ) {
			check(
				[ 1, 'two', true, null, undefined, 1.5 ],
				[ list|6, 1, text|3, ... str('two'), $mol_vary_spec.true, spec|none, spec|both, fp64, ... new Uint8Array( new Float64Array([ 1.5 ]).buffer ) ],
			)
		},

		"vary pack uint boundary values"( $ ) {
			check( 27, [ 27 ] )
			check( 28, [ uint|l1, 28 ] )
			check( 255, [ uint|l1, 255 ] )
			check( 256, [ uint|l2, 0, 1 ] )
			check( 65535, [ uint|l2, 255, 255 ] )
			check( 65536, [ uint|l4, 0, 0, 1, 0 ] )
		},

		"vary pack sint boundary values"( $ ) {
			check( -28, [ -28 ] )
			check( -29, [ sint|~l1, -29 ] )
			check( -128, [ sint|~l1, 128 ] )
			check( -129, [ sint|~l2, 127, 255 ] )
		},

	})
}
