namespace $ {

	const { word_break_only: word_break, repeat_greedy, decimal_only: digit, latin_only: letter } = $mol_regexp
	
	const variable = repeat_greedy( $mol_regexp.latin_only, 1 )
	const numb = repeat_greedy( $mol_regexp.decimal_only, 1 )
	const space = repeat_greedy( $mol_regexp.space_only, 1 )
	
	const binary = $mol_regexp.from({
		'(,)': ',',
		'(**)': '**',
		'(+)': '+',
		'(-)': '-',
		'(*)': '*',
		'(/)': '/',
		'(%)': '%',
		'(||)': '||',
		'(&&)': '&&',
		'(|)': '|',
		'(&)': '&',
		'(^)': '^',
		'(!==)': '!==',
		'(!=)': '!=',
		'(===)': '===',
		'(==)': '==',
		'(=)': '=',
		'(>=)': '>=',
		'(>)': '>',
		'(<=)': '<=',
		'(<)': '<',
		'(instanceof)': [ word_break, 'instanceof', word_break ],
		'(in)': [ word_break, 'in', word_break ],
	})
	
	// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
	const precedence_source = [
		[ '' ],
		[ '(,)' ],
		[ 'yield', 'yield*' ],
		[ '|=', '^=', '&=', '>>>=', '>>=', '<<=', '%=', '/=', '*=', '**=', '-=', '=' ],
		[ '?:' ],
		[ '(||)' ],
		[ '(&&)' ],
		[ '(|)' ],
		[ '(^)' ],
		[ '(&)' ],
		[ '(!==)', '(===)', '(!=)', '(=)' ],
		[ '(instanceof)', '(in)', '(>=)', '(>)', '(<=)', '(<)' ],
		[ '(>>>)', '(>>)', '(<<)' ],
		[ '(-)', '(+)' ],
		[ '(%)', '(/)', '(*)' ],
		[ '(**)' ],
		[ 'await', 'delete', 'void', 'typeof', '--', '++', '-', '+', '~', '!' ],
		[ '@++', '@--' ],
		[ 'new' ],
	] as const
	
	const precedence = {} as Record< typeof precedence_source[ number ][ number ], number >
	
	for( let prec = 0; prec < precedence_source.length; ++prec ) {
		for( const op of precedence_source[ prec ] ) {
			precedence[ op ] = prec
		}
	}
	
	const expr = $mol_regexp.from({
		binary,
		numb,
		variable,
		'(': '(',
		space,
		')': ')',
	})
	
	export function $mol_tree2_js_from_string( this: $, str: string ) {
		
		function begin_expr( $: $, str: string, kids: $mol_tree2[], from: number, parent = '' ) {
			
			// console.log( '>', from, parent )
			
			while( from < str.length ) {
				
				expr.lastIndex = from
				const found = expr.exec( str )!
				from = expr.lastIndex
				
				if( found['('] ) {
					
					const inner = [] as typeof kids
					from = begin_expr( $, str, inner, from, '' )
					
					for( const kid of inner ) {
						if( kid.type === parent ) kids.push( ... kid.kids )
						else kids.push( kid )
					}
					continue
					
					// console.log( parent, '(' )
					// if( parent ) {
						
					// 	from = parse_expr( str, kids, from )
					// 	continue
						
					// } else {
						
					// 	const inner = [] as typeof kids
					// 	from = parse_expr( str, inner, from, '()' )
						
					// 	kids.splice( 0, Number.MAX_SAFE_INTEGER, $mol_tree2.struct( '()', [
					// 		... kids,
					// 		$mol_tree2.struct( '(,)', inner ),
					// 	] ) )
						
					// }
					
				}
				
				if( found[')'] ) {
					// console.log( '<', parent, ')' )
					if( parent !== '' ) {
						from -= found[')'].length
					}
					break
				}
				
				if( found.space ) {
					continue
				}
				
				if( found.binary ) {
					
					const type = '(' + found.binary + ')'
					
					if( !precedence[ type ] ) $mol_fail( new Error( `Wrong binary operator ${ type }` ) )
					
					if( precedence[ type ] <= precedence[ parent ] ) {
						
						if( type === parent ) continue
						
						from -= found.binary.length
						break
						
					}
						
					const inner = [ kids.pop()! ]
					from = begin_expr( $, str, inner, from, type )
					
					for( const kid of inner ) {
						if( kid.type === parent ) kids.push( ... kid.kids )
						else kids.push( kid )
					}
					
					continue
				}
				
				if( found.numb ) {
					kids.push( $mol_tree2.struct( found.numb ) )
					continue
				}
				
				if( found.variable ) {
					kids.push( $mol_tree2.struct( found.variable ) )
					continue
				}
				
				if( parent ) {
					// console.log( '<', parent, found[0] )
					from -= found[0].length
					break
				}
				
				$.$mol_fail( new Error( `Unexpected "${ found[0] }"` ) )
			}
			
			if( parent ) {
				kids.splice( 0, Number.MAX_SAFE_INTEGER, $mol_tree2.struct( parent, kids.slice() ) )
			}
			
			return from
		}
		
		const res = [] as $mol_tree2[]
		begin_expr( this, str, res, 0, '' )
		return $mol_tree2.list( res )

	}
	
	
	
	class Common extends $mol_regexp_parser {
	
		static get syntax() {
			return {
				
				space: {
					pattern: repeat_greedy( $mol_regexp.space_only, 1 ),
					further: [],
					arity: 0,
					type: null,
				},
		
			} as const
		}
		
	}
	
	class Expr1 extends $mol_regexp_parser {
		
		@ $mol_memo.field
		static get syntax() {
			return {
				
				... Common.syntax,
				
				numb: {
					pattern: repeat_greedy( digit, 1 ),
					further: [ Expr2 ],
					arity: 0,
				},
				
				variable: {
					pattern: repeat_greedy( letter, 1 ),
					further: [ Expr2 ],
					arity: 0,
				},
				
				group_open: {
					pattern: '(',
					further: [],
					arity: 1,
					type: null,
				},
				
			
			} as const
		}
	
	}
	
	class Expr2 extends $mol_regexp_parser {
		
		@ $mol_memo.field
		static get syntax() {
			return {
				
				... Common.syntax,
				
				binary: {
					pattern: {
						'(,)': ',',
						'(**)': '**',
						'(+)': '+',
						'(-)': '-',
						'(*)': '*',
						'(/)': '/',
						'(%)': '%',
						'(||)': '||',
						'(&&)': '&&',
						'(|)': '|',
						'(&)': '&',
						'(^)': '^',
						'(!==)': '!==',
						'(!=)': '!=',
						'(===)': '===',
						'(==)': '==',
						'(=)': '=',
						'(>=)': '>=',
						'(>)': '>',
						'(<=)': '<=',
						'(<)': '<',
						'(instanceof)': [ word_break, 'instanceof', word_break ],
						'(in)': [ word_break, 'in', word_break ],
					},
					further: null,
					arity: 2,
				},
				
				group_close: {
					pattern: ')',
					further: [],
					arity: 1,
					type: null,
				},
				
			} as const
		}
		
	}
	
	setTimeout( ()=> {
		console.log( Expr1.parse( '12 + 34 * ( 56 - 78 ) / 2 ' ).toString() )
	},1000)
	
}
