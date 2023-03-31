namespace $ {

	$mol_test({

		'escape' () {

			const specials = $mol_regexp.from( '.*+?^${}()|[]\\' )
			$mol_assert_equal( specials.source , '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\' )

		},

		'char code' () {

			const space = $mol_regexp.from( 32 )
			$mol_assert_like( ' '.match( space ) , [ ' ' ] )

		},

		'repeat fixed'() {

			const { repeat , decimal_only: digit } = $mol_regexp

			const year = repeat( digit , 4 , 4 )
			$mol_assert_like( '#2020#'.match( year ) , [ '2020' ] )

		},

		'greedy repeat'() {

			const { repeat , repeat_greedy , latin_only: letter } = $mol_regexp

			$mol_assert_like( 'abc'.match( repeat( letter, 1, 2 ) ) , [ 'a', 'b', 'c' ] )
			$mol_assert_like( 'abc'.match( repeat_greedy( letter, 1, 2 ) ) , [ 'ab', 'c' ] )

		},

		'repeat range'() {

			const { repeat_greedy , decimal_only: digit } = $mol_regexp

			const year = repeat_greedy( digit , 2 , 4 )
			
			$mol_assert_like( '#2#'.match( year ) , null )
			$mol_assert_like( '#20#'.match( year ) , [ '20' ] )
			$mol_assert_like( '#2020#'.match( year ) , [ '2020' ] )
			$mol_assert_like( '#20201#'.match( year ) , [ '2020' ] )

		},

		'repeat from'() {

			const { repeat_greedy , latin_only: letter } = $mol_regexp

			const name = repeat_greedy( letter , 2 )

			$mol_assert_like( '##'.match( name ) , null )
			$mol_assert_like( '#a#'.match( name ) , null )
			$mol_assert_like( '#ab#'.match( name ) , [ 'ab' ] )
			$mol_assert_like( '#abc#'.match( name ) , [ 'abc' ] )

		},

		'from string'() {

			const regexp = $mol_regexp.from( '[\\d]' )
			
			$mol_assert_equal( regexp.source , '\\[\\\\d\\]' )
			$mol_assert_equal( regexp.flags , 'gsu' )

		},

		'from regexp'() {
			
			const regexp = $mol_regexp.from( /[\d]/i )
			
			$mol_assert_equal( regexp.source , '[\\d]' )
			$mol_assert_equal( regexp.flags , 'i' )

		},

		'split'() {
			
			const regexp = $mol_regexp.from( ';' )
			
			$mol_assert_like( 'aaa;bbb;ccc'.split( regexp ) , [ 'aaa', ';', 'bbb', ';', 'ccc' ] )
			$mol_assert_like( 'aaa;;ccc'.split( regexp ) , [ 'aaa', ';', '', ';', 'ccc' ] )
			$mol_assert_like( 'aaa'.split( regexp ) , [ 'aaa' ] )
			$mol_assert_like( ''.split( regexp ) , [''] )

		},

		'test for matching'() {
			
			const regexp = $mol_regexp.from( 'foo' )
			
			$mol_assert_like( regexp.test( '' ) , false )
			$mol_assert_like( regexp.test( 'fo' ) , false )
			$mol_assert_like( regexp.test( 'foo' ) , true )
			$mol_assert_like( regexp.test( 'foobar' ) , true )
			$mol_assert_like( regexp.test( 'barfoo' ) , true )

		},

		'case ignoring'() {

			const xxx = $mol_regexp.from( 'x' , { ignoreCase : true } )

			$mol_assert_like( xxx.flags , 'gisu' )
			$mol_assert_like( xxx.exec( 'xx' )![0] , 'x' )
			$mol_assert_like( xxx.exec( 'XX' )![0] , 'X' )

		},

		'multiline mode'() {

			const { end , from } = $mol_regexp

			const xxx = from( [ 'x' , end ] , { multiline : true } )

			$mol_assert_like( xxx.exec( 'x\ny' )![0] , 'x' )
			$mol_assert_like( xxx.flags , 'gmsu' )

		},

		'flags override'() {

			const triplet = $mol_regexp.from(
				$mol_regexp.from(
					/.../,
					{ ignoreCase: true },
				),
				{ multiline: true },
			)
			
			$mol_assert_like( triplet.toString() , '/.../gmsu' )

		},

		'sequence'() {

			const { begin , end , decimal_only: digit , repeat , from } = $mol_regexp
			
			const year = repeat( digit , 4 , 4 )
			const dash = '-'
			const month = repeat( digit , 2 , 2 )
			const day = repeat( digit , 2 , 2 )

			const date = from([ begin , year , dash , month , dash , day , end ])

			$mol_assert_like( date.exec( '2020-01-02' )![0] , '2020-01-02' )

		},

		'optional'() {

			const name = $mol_regexp.from([ 'A', ['4'] ])

			$mol_assert_equal( 'AB'.match( name )![0] , 'A' )
			$mol_assert_equal( 'A4'.match( name )![0] , 'A4' )

		},

		'anon variants'() {

			const name = $mol_regexp.from([ 'A', $mol_regexp.vary([ '4', '5' ]) ])

			$mol_assert_equal( 'AB'.match( name ) , null )
			$mol_assert_equal( 'A4'.match( name )![0] , 'A4' )
			$mol_assert_equal( 'A5'.match( name )![0] , 'A5' )

		},

		'only groups'() {

			const regexp = $mol_regexp.from({ dog : '@' })

			$mol_assert_like( [ ... '#'.matchAll( regexp ) ][0].groups , undefined )
			$mol_assert_like( [ ... '@'.matchAll( regexp ) ][0].groups , { dog : '@' } )

		},

		'catch skipped'() {

			const regexp = $mol_regexp.from(/(@)(\d?)/g)

			$mol_assert_like(
				[ ... '[[@]]'.matchAll( regexp ) ].map( f => [ ... f ] ) ,
				[
					[ '[[' ],
					[ '@', '@' , '' ],
					[ ']]' ],
				]
			)

		},

		'enum variants'() {

			enum Sex {
				male = 'male',
				female = 'female',
			}

			const sexism = $mol_regexp.from( Sex )

			$mol_assert_like( [ ... ''.matchAll( sexism ) ].length, 0 )
			$mol_assert_like( [ ... 'trans'.matchAll( sexism ) ][0].groups, undefined )
			
			$mol_assert_like(
				[ ... 'male'.matchAll( sexism ) ][0].groups,
				{ male : 'male' , female : '' },
			)
			
			$mol_assert_like(
				[ ... 'female'.matchAll( sexism ) ][0].groups,
				{ male : '' , female : 'female' },
			)

		},

		'recursive only groups'() {

			enum Sex {
				male = 'male',
				female = 'female',
			}

			const sexism = $mol_regexp.from({ Sex })

			$mol_assert_like( [ ... ''.matchAll( sexism ) ].length , 0 )
			
			$mol_assert_like(
				[ ... 'male'.matchAll( sexism ) ][0].groups,
				{ Sex : 'male' , male : 'male' , female : '' },
			)
			
			$mol_assert_like(
				[ ... 'female'.matchAll( sexism ) ][0].groups,
				{ Sex : 'female' , male : '' , female : 'female' },
			)

		},

		'sequence with groups'() {

			const { begin , end , decimal_only: digit , repeat , from } = $mol_regexp
			const year = repeat( digit , 4 , 4 )
			const dash = '-'
			const month = repeat( digit , 2 , 2 )
			const day = repeat( digit , 2 , 2 )

			const regexp = from([ begin , {year} , dash , {month} , dash , {day} , end ])
			const found = [ ... '2020-01-02'.matchAll( regexp ) ]

			$mol_assert_like( found[0].groups , {
				year : '2020' ,
				month : '01' ,
				day : '02' ,
			} )

		},

		'sequence with groups of mixed type'() {

			const prefix = '/'
			const postfix = '/'

			const regexp = $mol_regexp.from([ {prefix} , /(\w+)/ , {postfix} , /([gumi]*)/ ])

			$mol_assert_like(
				[ ... '/foo/mi'.matchAll( regexp ) ],
				[
					Object.assign(
						[ "/foo/mi", "/", "foo", "/", "mi" ],
						{
							groups: {
								prefix : '/' ,
								postfix : '/' ,
							},
							index: 0,
							input: "/",
						},
					),
				],
			)

		},

		'recursive sequence with groups'() {

			const { begin , end , decimal_only: digit , repeat , from } = $mol_regexp
			const year = repeat( digit , 4 , 4 )
			const dash = '-'
			const month = repeat( digit , 2 , 2 )
			const day = repeat( digit , 2 , 2 )

			const regexp = from([
				begin , { date : [ {year} , dash , {month} ] } , dash , {day} , end
			])
			
			const found = [ ... '2020-01-02'.matchAll( regexp ) ]

			$mol_assert_like( found[0].groups , {
				date : '2020-01' ,
				year : '2020' ,
				month : '01' ,
				day : '02' ,
			} )

		},

		'parse multiple'() {

			const { decimal_only: digit , from } = $mol_regexp

			const regexp = from({ digit })

			$mol_assert_like(
				[ ... '123'.matchAll( regexp ) ].map( f => f.groups ) ,
				[
					{ digit : '1' },
					{ digit : '2' },
					{ digit : '3' },
				]
			)

		},

		'named variants'() {

			const { begin , or , end , from } = $mol_regexp

			const sexism = from([
				begin , 'sex = ' , { sex : [ 'male' , or , 'female' ] } , end
			])

			$mol_assert_like( [ ... 'sex = male'.matchAll( sexism ) ][0].groups , { sex : 'male' } )
			$mol_assert_like( [ ... 'sex = female'.matchAll( sexism ) ][0].groups , { sex : 'female' } )
			$mol_assert_like( [ ... 'sex = malefemale'.matchAll( sexism ) ][0].groups , undefined )

		},

		'force after'() {

			const { latin_only: letter , force_after , from } = $mol_regexp

			const regexp = from([ letter , force_after( '.' ) ])

			$mol_assert_like( 'x.'.match( regexp ) , [ 'x' ] )
			$mol_assert_like( 'x,'.match( regexp ) , null )

		},

		'forbid after'() {

			const { latin_only: letter , forbid_after , from } = $mol_regexp

			const regexp = from([ letter , forbid_after( '.' ) ])

			$mol_assert_like( 'x.'.match( regexp ) , null )
			$mol_assert_like( 'x,'.match( regexp ) , [ 'x' ] )

		},

		'char except'() {

			const { char_except, latin_only, tab } = $mol_regexp

			const name = char_except( latin_only, tab )

			$mol_assert_like( 'a'.match( name ) , null )
			$mol_assert_like( '\t'.match( name ) , null )
			$mol_assert_like( '('.match( name ) , [ '(' ] )

		},

		'unicode only'() {

			const { unicode_only, from } = $mol_regexp

			const name = from([
				unicode_only( 'Script', 'Cyrillic' ),
				unicode_only( 'Hex_Digit' ),
			])

			$mol_assert_like( 'FF'.match( name ) , null )
			$mol_assert_like( 'ФG'.match( name ) , null )
			$mol_assert_like( 'ФF'.match( name ) , [ 'ФF' ] )

		},

		'generate by optional with inner group'() {

			const { begin, end, from } = $mol_regexp
			
			const animals = from([ begin, '#', [ '^', { dog : '@' } ], end ])

			$mol_assert_equal( animals.generate({}) , '#' )
			
			$mol_assert_equal( animals.generate({ dog: false }) , '#' )
			$mol_assert_equal( animals.generate({ dog: true }) , '#^@' )
			
			$mol_assert_fail( ()=> animals.generate({ dog: '$' }) , 'Wrong param: dog=$' )

		},

		'generate by optional with inner group with variants'() {

			const { begin, end, from } = $mol_regexp
			
			const animals = from([ begin, '#', [ '^', { animal: { dog : '@', fox: '&' } } ], end ])

			$mol_assert_equal( animals.generate({}) , '#' )
			
			$mol_assert_equal( animals.generate({ dog: true }) , '#^@' )
			$mol_assert_equal( animals.generate({ fox: true }) , '#^&' )
			
			$mol_assert_fail( ()=> animals.generate({ dog: '$' }) , 'Wrong param: dog=$' )

		},
		
		'complex example'() {
			
			const {
				begin, end,
				char_only, char_range,
				latin_only, slash_back,
				repeat_greedy, from,
			} = $mol_regexp
			
			const atom_char = char_only( latin_only, "!#$%&'*+/=?^`{|}~-" )
			const atom = repeat_greedy( atom_char, 1 )
			const dot_atom = from([ atom, repeat_greedy([ '.', atom ]) ])
			
			const name_letter = char_only(
				char_range( 0x01, 0x08 ),
				0x0b, 0x0c,
				char_range( 0x0e, 0x1f ),
				0x21,
				char_range( 0x23, 0x5b ),
				char_range( 0x5d, 0x7f ),
			)
			
			const quoted_pair = from([
				slash_back,
				char_only(
					char_range( 0x01, 0x09 ),
					0x0b, 0x0c,
					char_range( 0x0e, 0x7f ),
				)
			])
			
			const name = repeat_greedy({ name_letter, quoted_pair })
			const quoted_name = from([ '"', {name}, '"' ])
			
			const local_part = from({ dot_atom, quoted_name })
			const domain = dot_atom
			
			const mail = from([ begin, local_part, '@', {domain}, end ])
			
			$mol_assert_equal( 'foo..bar@example.org'.match( mail ), null )
			$mol_assert_equal( 'foo..bar"@example.org'.match( mail ), null )
			
			$mol_assert_like(
				[ ... 'foo.bar@example.org'.matchAll( mail ) ][0].groups,
				{
					dot_atom: "foo.bar",
					quoted_name: "",
					name: "",
					name_letter: "",
					quoted_pair: "",
					domain: "example.org",
				}
			)
			
			$mol_assert_like(
				[ ... '"foo..bar"@example.org'.matchAll( mail ) ][0].groups,
				{
					dot_atom: "",
					quoted_name: '"foo..bar"',
					name: "foo..bar",
					name_letter: "r",
					quoted_pair: "",
					domain: "example.org",
				}
			)
			
			$mol_assert_equal(
				mail.generate({ dot_atom: 'foo.bar', domain: 'example.org' }),
				'foo.bar@example.org',
			)
			
			$mol_assert_equal(
				mail.generate({ name: 'foo..bar', domain: 'example.org' }),
				'"foo..bar"@example.org',
			)
			
			$mol_assert_fail(
				()=> mail.generate({ dot_atom: 'foo..bar', domain: 'example.org' }),
				'Wrong param: dot_atom=foo..bar',
			)
			
		},
		
	})

}
