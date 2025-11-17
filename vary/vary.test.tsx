/** @jsx $mol_jsx */
namespace $.$$ {
	
	const { uint, link, spec, blob, text, list, tupl, sint } = $mol_vary_tip
	const { none, both, fp16, fp32, fp64 } = $mol_vary_spec
	const { L1, L2, L4, L8, LA } = $mol_vary_len
	const str = $mol_charset_encode
	
	function check( vary: unknown, ideal: readonly number[], Vary = $mol_vary ) {
		const pack = Vary.pack( vary )
		$mol_assert_equal( pack, new Uint8Array( ideal ) )
		$mol_assert_equal( Vary.take( pack ), vary )
	}
	
	$mol_test({
		
		"vary pack logical"( $ ) {
			check( null, [ spec|none ] )
			check( true, [ $mol_vary_spec.true ] )
			check( false, [ $mol_vary_spec.fake ] )
			check( undefined, [ spec|both ] )
		},
		
		"vary pack uint0"( $ ) {
			check( 0, [ 0 ] )
			check( 27, [ 27 ] )
		},
		
		"vary pack uint1"( $ ) {
			check( 28, [ uint|L1, 28 ] )
			check( 255 , [ uint|L1, 255 ] )
		},
		
		"vary pack uint2"( $ ) {
			check( 256, [ uint|L2, 0, 1 ] )
			check( 256**2-1, [ uint|L2, 255, 255 ] )
		},
		
		"vary pack uint4"( $ ) {
			check( 256**2, [ uint|L4, 0, 0, 1, 0 ] )
			check( 256**4-1, [ uint|L4, 255, 255, 255, 255 ] )
		},
		
		"vary pack uint8"( $ ) {
			check( 256**4, [ uint|L8, 0, 0, 0, 0, 1, 0, 0, 0 ] )
			check( Number.MAX_SAFE_INTEGER, [ uint|L8, 255, 255, 255, 255, 255, 255, 31, 0 ] )
			check( 256n**8n-1n, [ uint|L8, 255, 255, 255, 255, 255, 255, 255, 255 ] )
		},
		
		"vary pack with wrong size"( $ ) {
			$mol_assert_fail( ()=> $mol_vary.take( new Uint8Array([ uint|L1 ]) ), Error )
			$mol_assert_fail( ()=> $mol_vary.take( new Uint8Array([ uint|L1, 200, 300 ]) ), 'Buffer too large' )
		},
		
		"vary pack sint0"( $ ) {
			check( -1, [ -1 ] )
			check( -27, [ -27 ] )
		},
		
		"vary pack sint1"( $ ) {
			check( -28, [ sint|-L1, -28 ] )
			check( -256/2 , [ sint|-L1, 128 ] )
		},
		
		"vary pack sint2"( $ ) {
			check( -256/2-1, [ sint|-L2, 127, 255 ] )
			check( -(256**2)/2, [ sint|-L2, 0, 128 ] )
		},
		
		"vary pack sint4"( $ ) {
			check( -(256**2)/2-1, [ sint|-L4, 255, 127, 255, 255 ] )
			check( -(256**4)/2, [ sint|-L4, 0, 0, 0, 128 ] )
		},
		
		"vary pack sint8"( $ ) {
			check( -(256**4)/2-1, [ sint|-L8, 255, 255, 255, 127, 255, 255, 255, 255 ] )
			check( Number.MIN_SAFE_INTEGER, [ sint|-L8, 1, 0, 0, 0, 0, 0, 224, 255 ] )
			check( -(256n**8n)/2n, [ sint|-L8, 0, 0, 0, 0, 0, 0, 0, 128 ] )
		},
		
		"vary pack bigint"( $ ) {
			check( 2n**64n, [ sint|-LA, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ] )
			check( 2n**2104n, [ sint|-LA, 255, ... Array.from( { length: 263 }, () => 0 ), 1 ] )
			check( -1n - 2n**64n, [ sint|-LA, 0, 255, 255, 255, 255, 255, 255, 255, 255, 254 ] )
			check( -1n - 2n**2104n, [ sint|-LA, 255, ... Array.from( { length: 263 }, () => 255 ), 254 ] )
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
		
		"vary pack cyclic list"( $ ) {
			const foo = [] as any[]
			foo.push([ foo ])
			$mol_assert_fail( ()=> $mol_vary.pack( foo ), 'Cyclic refs' )
		},
		
		"vary pack dedup uint"( $ ) {
			check(
				[ 28, 28 ],
				[ list|2, uint|L1, 28, link|0 ],
			)
			check(
				[ 2n**64n, 2n**64n ],
				[ list|2, sint|-LA, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, link|0 ],
			)
		},
		
		"vary pack dedup float"( $ ) {
			check(
				[ 1.5, 1.5 ],
				[ list|2, fp64,  ... new Uint8Array( new Float64Array([ 1.5 ]).buffer ), link|0 ],
			)
		},
		
		"vary pack text"( $ ) {
			check( 'foo', [ text|3, ... str('foo') ] )
			const long = 'abcdefghijklmnopqrstuvwxyzЖЫ'
			check( long, [ text|L1, 28, ... str(long) ] )
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
				[ blob|2, uint|L1, 1, 255 ],
			)
			check(
				new Int8Array([ -128, 127 ]),
				[ blob|2, sint|~L1, -128, 127 ],
			)
			check(
				new Uint32Array([ 255 ]),
				[ blob|4, uint|L4, 255, 0, 0, 0 ],
			)
			check(
				new Int32Array([ -128 ]),
				[ blob|4, sint|~L4, -128, 255, 255, 255 ],
			)
			check(
				new BigUint64Array([ 255n ]),
				[ blob|8, uint|L8, 255, 0, 0, 0, 0, 0, 0, 0 ],
			)
			check(
				new BigInt64Array([ -128n ]),
				[ blob|8, sint|~L8, -128, 255, 255, 255, 255, 255, 255, 255 ],
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
		
		"vary pack dedup blob"( $ ) {
			const part = new Uint8Array([ 1, 2 ])
			check(
				[ part, part ],
				[ list|2, blob|2, uint|L1, 1, 2, link|0 ],
			)
		},
		
		"vary pack struct"( $ ) {
			check(
				{ x: 1, y: 2 },
				[ tupl|2, list|2, text|1, ... str('x'), text|1, ... str('y'), 1, 2 ],
			)
			check(
				{ x: {}, y: { a: 1 } },
				[ tupl|2, list|2, text|1, ... str('x'), text|1, ... str('y'), tupl|0, list|0, tupl|1, list|1, text|1, ... str('a'), 1 ],
			)
		},
		
		"vary pack struct shape dedup"( $ ) {
			check(
				[ {}, { foo: 1 }, { foo: 2 } ],
				[ list|3, tupl|0, list|0, tupl|1, list|1, text|3, ... str('foo'), 1, tupl|1, link|3, 2 ],
			)
			check(
				{ x: 1, y: { x: 2, y: 3 } },
				[ tupl|2, list|2, text|1, ... str('x'), text|1, ... str('y'), 1, tupl|2, link|2, 2, 3 ],
			)
		},
		
		"vary pack struct full dedup"( $ ) {
			const item = { x: 1 }
			check(
				[ item, item ],
				[ list|2,  tupl|1, list|1, text|1, ... str('x'), 1, link|2 ],
			)
			const part = { x: 1, y : 2 }
			check(
				{ x: part, y: part },
				[ tupl|2, list|2, text|1, ... str('x'), text|1, ... str('y'), tupl|2, link|2, 1, 2, link|3 ],
			)
		},
		
		"vary pack cyclic struct"( $ ) {
			const foo = { bar: null as any }
			foo.bar = foo
			$mol_assert_fail( ()=> $mol_vary.pack( foo ), 'Cyclic refs' )
		},
		
		"vary pack Map"( $ ) {
			
			check(
				new Map< any, any >([ [ 'foo', 1 ], [ 2, 'bar' ] ]),
				[ tupl|2, list|2, text|4, ... str('keys'), text|4, ... str('vals'), list|2, text|3, ... str('foo'), 2, list|2, 1, text|3, ... str('bar') ],
			)
			
		},
		
		"vary pack Set"( $ ) {
			
			check(
				new Set([ 7, 'foo' ]),
				[ tupl|1, list|1, text|3, ... str('set'), list|2, 7, text|3, ... str('foo') ],
			)
			
		},
		
		"vary pack Date"( $ ) {
			
			const date1 = new Date( '2025-01-02T03:04:05' )
			check(
				date1,
				[ tupl|1, list|1, text|9, ... str('unix_time'), uint|L4, ... new Uint8Array( new Uint32Array([ date1.valueOf() / 1000 ]).buffer ) ],
			)
			
			const date2 = new Date( '2025-01-02T03:04:05.678' )
			check(
				date2,
				[ tupl|1, list|1, text|9, ... str('unix_time'), fp64, ... new Uint8Array( new Float64Array([ date2.valueOf() / 1000 ]).buffer ) ],
			)
			
		},
		
		"vary pack DOM Node"( $ ) {
			
			check(
				<span/>,
				[
					tupl|4, list|4, text|4, ... str('elem'), text|4, ... str('keys'), text|4, ... str('vals'), text|4, ... str('kids'),
						text|4, ... str('SPAN'), list|0, list|0, list|0
				],
			)
			
			check(
				<span tabIndex="0" />,
				[
					tupl|4, list|4, text|4, ... str('elem'), text|4, ... str('keys'), text|4, ... str('vals'), text|4, ... str('kids'),
						text|4, ... str('SPAN'), list|1, text|8, ... str('tabindex'), list|1, text|1, ... str('0'), list|0
				],
			)
			
			check(
				<span>text</span>,
				[
					tupl|4, list|4, text|4, ... str('elem'), text|4, ... str('keys'), text|4, ... str('vals'), text|4, ... str('kids'),
						text|4, ... str('SPAN'), list|0, list|0, list|1,
							text|4, ... str('text')
				],
			)
			
			check(
				<div><span/> </div>,
				[
					tupl|4, list|4, text|4, ... str('elem'), text|4, ... str('keys'), text|4, ... str('vals'), text|4, ... str('kids'),
						text|3, ... str('DIV'), list|0, list|0, list|2,
							tupl|4, link|4, text|4, ... str('SPAN'), list|0, list|0, list|0,
							text|1, ... str(' '),
				],
			)
			
		},
		
		"vary pack DOM Comment"( $ ) {
			check(
				<div>{ $mol_dom.document.createComment( 'foo' )  }</div>,
				[
					tupl|4, list|4, text|4, ... str('elem'), text|4, ... str('keys'), text|4, ... str('vals'), text|4, ... str('kids'),
						text|3, ... str('DIV'), list|0, list|0, list|1,
							tupl|1, list|1, text|8, ... str('#comment'), text|3, ... str('foo'),
				],
			)
		},
		
		"vary pack DOM PI"( $ ) {
			check(
				<div>{ $mol_dom.document.createProcessingInstruction( 'foo', 'bar' )  }</div>,
				[
					tupl|4, list|4, text|4, ... str('elem'), text|4, ... str('keys'), text|4, ... str('vals'), text|4, ... str('kids'),
						text|3, ... str('DIV'), list|0, list|0, list|1,
							tupl|2, list|2, text|6, ... str('target'), text|4, ... str('text'), text|3, ... str('foo'), text|3, ... str('bar'),
				],
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
			
			const Vary = $mol_vary.room()
			
			Vary.type({
				type: Foo,
				keys: [ 'summ', 'diff' ],
				lean: foo => [ foo.a + foo.b, foo.a - foo.b ],
				rich: ([ summ, diff ])=> new Foo( ( summ + diff )/2, ( summ - diff )/2 ),
			})
			
			// restore
			check(
				new Foo( 4, 2 ),
				[ tupl|2, list|2, text|4, ... str('summ'), text|4, ... str('diff'), 6, 2 ],
				Vary,
			)
			
			// isolated
			$mol_assert_equal(
				$mol_vary.take( $mol_vary.pack( new Foo( 4, 2 ) ) ),
				{ summ: 6, diff: 2 } as any,
			)
			
			// inherited
			$mol_assert_equal(
				Vary.take( Vary.pack( new Map([[ 1, 2 ]]) ) ),
				new Map([[ 1, 2 ]]),
			)
			
		},
		
	})
}
