namespace $ {

	$mol_test({

		'escape' () {

			const specials = $mol_regexp.from( '.*+?^${}()|[]\\' )
			$mol_assert_equal( specials.source , '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\' )

		},

		'char code' () {

			const space = $mol_regexp.char_code( 32 )
			$mol_assert_equal( space.exec(' ')![0] , ' ' )

		},

		'repeat fixed'() {

			const { repeat , digit } = $mol_regexp

			const year = repeat( digit , 4 , 4 )
			$mol_assert_equal( year.exec( '#2020#' )![0] , '2020' )

		},

		'greedy repeat'() {

			const { repeat , repeat_greedy , letter } = $mol_regexp

			$mol_assert_equal( repeat( letter ).exec( 'abc' )![0] , '' )
			$mol_assert_equal( repeat_greedy( letter ).exec( 'abc' )![0] , 'abc' )

		},

		'repeat range'() {

			const { repeat_greedy , digit } = $mol_regexp

			const year = repeat_greedy( digit , 2 , 4 )
			
			$mol_assert_equal( year.exec( '#2#' ) , null )
			$mol_assert_equal( year.exec( '#20#' )![0] , '20' )
			$mol_assert_equal( year.exec( '#2020#' )![0] , '2020' )
			$mol_assert_equal( year.exec( '#20201#' )![0] , '2020' )

		},

		'repeat from'() {

			const { repeat_greedy , letter } = $mol_regexp

			const name = repeat_greedy( letter , 2 )

			$mol_assert_equal( name.exec( '##' ) , null )
			$mol_assert_equal( name.exec( '#a#' ) , null )
			$mol_assert_equal( name.exec( '#ab#' )![0] , 'ab' )
			$mol_assert_equal( name.exec( '#abc#' )![0] , 'abc' )

		},

		'optional'() {

			const { optional , letter } = $mol_regexp

			const name = optional( letter )

			$mol_assert_equal( name.exec( '' )![0] , '' )
			$mol_assert_equal( name.exec( 'a' )![0] , 'a' )
			$mol_assert_equal( name.exec( 'ab' )![0] , 'a' )

		},

		'from string'() {

			const regexp = $mol_regexp.from( '[\\d]' )
			
			$mol_assert_equal( regexp.source , '\\[\\\\d\\]' )
			$mol_assert_equal( regexp.flags , 'gu' )

		},

		'from regexp'() {
			
			const regexp = $mol_regexp.from( /[\d]/i )
			
			$mol_assert_equal( regexp.source , '[\\d]' )
			$mol_assert_equal( regexp.flags , 'i' )

		},

		'case ignoring'() {

			const xxx = $mol_regexp.from( 'x' , { ignoreCase : true } )

			$mol_assert_like( xxx.flags , 'giu' )
			$mol_assert_like( xxx.exec( 'xx' )![0] , 'x' )
			$mol_assert_like( xxx.exec( 'XX' )![0] , 'X' )

		},

		'multiline mode'() {

			const { end } = $mol_regexp

			const xxx = $mol_regexp.from( [ 'x' , end ] , { multiline : true } )

			$mol_assert_like( xxx.exec( 'x\ny' )![0] , 'x' )
			$mol_assert_like( xxx.flags , 'gmu' )

		},

		'sequence'() {

			const { begin , end , digit , repeat } = $mol_regexp
			const year = repeat( digit , 4 , 4 )
			const dash = '-'
			const month = repeat( digit , 2 , 2 )
			const day = repeat( digit , 2 , 2 )

			const date = $mol_regexp.from( [ begin , year , dash , month , dash , day , end ] , { ignoreCase : true } )

			$mol_assert_like( date.exec( '2020-01-02' )![0] , '2020-01-02' )
			$mol_assert_like( date.ignoreCase , true )

		},

		'only groups'() {

			const regexp = $mol_regexp.from({ dog : '@' })

			$mol_assert_like( [ ... regexp.parse( '#' ) ] , [] )
			$mol_assert_like( [ ... regexp.parse( '@' ) ] , [{ dog : '@' }] )

		},

		'catch skipped'() {

			const regexp = $mol_regexp.from(/(@)(\d?)/g)

			$mol_assert_like( [ ... regexp.parse( '[[@]]' ) ] , [
				{ 0 : '[[' },
				{ 1 : '@' , 2 : '' },
				{ 0 : ']]' },
			] )

		},

		'enum variants'() {

			enum Sex {
				male = 'male',
				female = 'female',
			}

			const sexism = $mol_regexp.from( Sex )

			$mol_assert_like( [ ... sexism.parse( '' ) ] , [] )
			$mol_assert_like( [ ... sexism.parse( 'male' ) ] , [{ male : 'male' , female : '' }] )
			$mol_assert_like( [ ... sexism.parse( 'female' ) ] , [{ male : '' , female : 'female' }] )

		},

		'recursive only groups'() {

			enum Sex {
				male = 'male',
				female = 'female',
			}

			const sexism = $mol_regexp.from({ Sex })

			$mol_assert_like( [ ... sexism.parse( '' ) ] , [] )
			$mol_assert_like( [ ... sexism.parse( 'male' ) ] , [{ Sex : 'male' , male : 'male' , female : '' }] )
			$mol_assert_like( [ ... sexism.parse( 'female' ) ] , [{ Sex : 'female' , male : '' , female : 'female' }] )

		},

		'sequence with groups'() {

			const { begin , end , digit , repeat } = $mol_regexp
			const year = repeat( digit , 4 , 4 )
			const dash = '-'
			const month = repeat( digit , 2 , 2 )
			const day = repeat( digit , 2 , 2 )

			const regexp = $mol_regexp.from([ begin , {year} , dash , {month} , dash , {day} , end ])
			const found = [ ... regexp.parse( '2020-01-02' ) ]

			$mol_assert_like( found , [{
				year : '2020' ,
				month : '01' ,
				day : '02' ,
			}] )

		},

		'sequence with groups of mixed type'() {

			const prefix = '/'
			const postfix = '/'

			const regexp = $mol_regexp.from([ {prefix} , /(\w+)/ , {postfix} , /([gumi]*)/ ])
			const found = [ ... regexp.parse( '/foo/mi' ) ]

			$mol_assert_like( found , [{
				prefix : '/' ,
				0 : 'foo' ,
				postfix : '/' ,
				1 : 'mi' ,
			}] )

		},

		'recursive sequence with groups'() {

			const { begin , end , digit , repeat } = $mol_regexp
			const year = repeat( digit , 4 , 4 )
			const dash = '-'
			const month = repeat( digit , 2 , 2 )
			const day = repeat( digit , 2 , 2 )

			const regexp = $mol_regexp.from([ begin , { date : [ {year} , dash , {month} ] } , dash , {day} , end ])
			const found = [ ... regexp.parse( '2020-01-02' ) ]

			$mol_assert_like( found , [{
				date : '2020-01' ,
				year : '2020' ,
				month : '01' ,
				day : '02' ,
			}] )

		},

		'parse multiple'() {

			const { digit } = $mol_regexp

			const regexp = $mol_regexp.from({ digit })

			$mol_assert_like( [ ... regexp.parse( '123' ) ] , [
				{ digit : '1' },
				{ digit : '2' },
				{ digit : '3' },
			] )

		},

		'variants'() {

			const { begin , or , end } = $mol_regexp

			const sexism = $mol_regexp.from([ begin , 'sex = ' , [ { sex : 'male' } , or , { sex : 'female' } ] , end ])

			$mol_assert_like( [ ... sexism.parse( 'sex = male' ) ] , [{ sex : 'male' }] )
			$mol_assert_like( [ ... sexism.parse( 'sex = female' ) ] , [{ sex : 'female' }] )
			$mol_assert_like( [ ... sexism.parse( 'sex = malefemale' ) ] , [] )

		},

		'force after'() {

			const { letter , force_after } = $mol_regexp

			const regexp = $mol_regexp.from([ letter , force_after( '.' ) ])

			$mol_assert_equal( regexp.exec( 'x.' )![0] , 'x' )
			$mol_assert_equal( regexp.exec( 'x5' ) , null )

		},

		'forbid after'() {

			const { letter , forbid_after } = $mol_regexp

			const regexp = $mol_regexp.from([ letter , forbid_after( '.' ) ])

			$mol_assert_equal( regexp.exec( 'x.' ) , null )
			$mol_assert_equal( regexp.exec( 'x5' )![0] , 'x' )

		},

	})

}
