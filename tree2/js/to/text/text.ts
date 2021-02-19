namespace $ {

	export function $mol_tree2_js_to_text( this: $, js: $mol_tree2 ) {

		function sequence( open?: string, separator?: string, close?: string ) {
			return ( input: $mol_tree2, belt: $mol_tree2_belt< never > )=> [
				... open ? [ input.data( open ) ] : [],
				input.struct( separator && input.kids.length > 2 ? 'indent' : 'line',
					( [] as $mol_tree2[] ).concat(
						... input.kids.map( ( kid, index ) => [
							kid.struct( 'line', [
								... kid.list([ kid ]).hack( belt ),
								... ( separator && index < input.kids.length - 1 ) ? [ kid.data( separator ) ] : [],
							] ),
						] ),
					)
				),
				... close ? [ input.data( close ) ] : [],
			]
		}

		function duplet( open?: string, separator?: string, close?: string ) {
			return ( input: $mol_tree2, belt:  $mol_tree2_belt< never > )=> [
				... open ? [ input.data( open ) ] : [],
				... input.list( input.kids.slice( 0, 1 ) ).hack( belt ),
				... ( separator && input.kids.length > 1 ) ? [ input.data( separator ) ] : [],
				... input.list( input.kids.slice( 1, 2 ) ).hack( belt ),
				... close ? [ input.data( close ) ] : [],
			]
		}

		function triplet( open?: string, separator12?: string, separator23?: string, close?: string ) {
			return ( input: $mol_tree2, belt:  $mol_tree2_belt< never > )=> [
				... open ? [ input.data( open ) ] : [],
				... input.list( input.kids.slice( 0, 1 ) ).hack( belt ),
				... ( separator12 && input.kids.length > 1 ) ? [ input.data( separator12 ) ] : [],
				... input.list( input.kids.slice( 1, 2 ) ).hack( belt ),
				... ( separator23 && input.kids.length > 2 ) ? [ input.data( separator23 ) ] : [],
				... input.list( input.kids.slice( 2, 3 ) ).hack( belt ),
				... close ? [ input.data( close ) ] : [],
			]
		}

		return js.list([ js.struct( 'line', js.hack({

			'+': sequence( '+' ),
			'-': sequence( '-' ),
			'!': sequence( '!' ),
			'~': sequence( '~' ),

			'return': sequence( 'return ' ),
			'break': sequence( 'break ' ),
			'continue': sequence( 'continue ' ),
			'yield': sequence( 'yield ' ),
			'yield*': sequence( 'yield* ' ),
			'await': sequence( 'await ' ),
			'void': sequence( 'void ' ),
			'delete': sequence( 'delete ' ),
			'typeof': sequence( 'typeof ' ),
			'new': sequence( 'new ' ),
			'...': sequence( '...' ),

			'@++': sequence( '', '', '++' ),
			'@--': sequence( '', '', '--' ),
			
			'(in)': sequence( '(', ' in ', ')' ),
			'(instanceof)': sequence( '(', ' instanceof ', ')' ),

			'(+)': sequence( '(', ' + ', ')' ),
			'(-)': sequence( '(', ' - ', ')' ),
			'(*)': sequence( '(', ' * ', ')' ),
			'(/)': sequence( '(', ' / ', ')' ),
			'(%)': sequence( '(', ' % ', ')' ),
			'(**)': sequence( '(', ' ** ', ')' ),
			
			'(<)': sequence( '(', ' < ', ')' ),
			'(<=)': sequence( '(', ' <= ', ')' ),
			'(>)': sequence( '(', ' > ', ')' ),
			'(>=)': sequence( '(', ' >= ', ')' ),
			'(==)': sequence( '(', ' == ', ')' ),
			'(===)': sequence( '(', ' === ', ')' ),
			
			'(<<)': sequence( '(', ' << ', ')' ),
			'(>>)': sequence( '(', ' >> ', ')' ),
			'(>>>)': sequence( '(', ' >>> ', ')' ),
			'(&)': sequence( '(', ' & ', ')' ),
			'(|)': sequence( '(', ' | ', ')' ),
			'(^)': sequence( '(', ' ^ ', ')' ),
			
			'(&&)': sequence( '(', ' && ', ')' ),
			'(||)': sequence( '(', ' || ', ')' ),
			'(,)': sequence( '(', ', ', ')' ),
			'{;}': sequence( '{', '; ', '}' ),
			'[,]': sequence( '[', ', ', ']' ),
			'{,}': sequence( '{', ', ', '}' ),
			':': duplet( '[', ']: ' ),

			'()': sequence( '(', '', ')' ),
			'[]': sequence( '[', '', ']' ),
			'{}': sequence( '{', '', '}' ),
			
			'let': duplet( 'let ', ' = ' ),
			'const': duplet( 'const ', ' = ' ),
			'var': duplet( 'var ', ' = ' ),

			'=': duplet( '', ' = ' ),
			'+=': duplet( '', ' += ' ),
			'-=': duplet( '', ' -= ' ),
			'*=': duplet( '', ' *= ' ),
			'/=': duplet( '', ' /= ' ),
			'%=': duplet( '', ' %= ' ),
			'**=': duplet( '', ' **= ' ),
			'<<=': duplet( '', ' <<= ' ),
			'>>=': duplet( '', ' >>= ' ),
			'>>>=': duplet( '', ' >>>= ' ),
			'&=': duplet( '', ' &= ' ),
			'|=': duplet( '', ' |= ' ),
			'^=': duplet( '', ' ^= ' ),
			'&&=': duplet( '', ' &&= ' ),
			'||=': duplet( '', ' ||= ' ),

			'=>': duplet( '', ' => ' ),
			'async=>': duplet( 'async ', ' => ' ),
			'function': triplet( 'function ' ),
			'function*': triplet( 'function* ' ),
			'async': triplet( 'async function ' ),
			'async*': triplet( 'async function* ' ),

			'class': triplet( 'class ' ),

			'if': triplet( 'if', '', 'else' ),
			'?:': triplet( '', ' ? ', ' : ' ),

			'.': triplet( '[', ']' ),
			'get': triplet( 'get [', ']' ),
			'set': triplet( 'set [', ']' ),
			'static': triplet( 'static [', ']' ),
			
			'/./': sequence(),
			'.global': sequence( 'g' ),
			'.multiline': sequence( 'm' ),
			'.ignoreCase': sequence( 'i' ),
			'.source': ( input, belt )=> [
				input.data( '/' ),
				input.data( JSON.stringify( input.text() ).slice( 1, -1 ) ),
				input.data( '/' ),
			],

			'``': ( input, belt )=> {
				return [
					input.data( '`' ),
					... ( [] as $mol_tree2[] ).concat( ... input.kids.map( kid => {
						if( kid.type ) {
							return [
								kid.data( '${' ),
								... kid.list([ kid ]).hack( belt ),
								kid.data( '}' ),
							]
						} else {
							return [
								input.data( JSON.stringify( kid.text() ).slice( 1, -1 ) ),
							]
						}
					} ) ),
					input.data( '`' ),
				]
			},

			'': ( input, belt )=> {

				// string
				if( !input.type ) return [
					input.data( JSON.stringify( input.text() ) ),
				]
				
				// variable
				if( /^[\w$#][\w0-9$]*$/i.test( input.type ) ) return [
					input.data( input.type ),
					// ... input.hack( context ),
				]
				
				// number
				if( input.type === 'NaN' || !Number.isNaN( Number( input.type ) ) ) return [
					input.data( input.type )
				]

				$mol_fail( input.error( `wrong node type` ) )

			},

		}) ) ])

	}

}
