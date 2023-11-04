namespace $ {
	
	/**
	 * Argument must be Truthy
	 * @example
	 * $mol_assert_ok( 1 ) // Passes
	 * $mol_assert_ok( 0 ) // Fails because Falsy
	 * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
	 */
	export function $mol_assert_ok( value : any ) {
		if( value ) return
		$mol_fail( new Error( `${value} ≠ true` ) )
	}
	
	/**
	 * Argument must be Falsy
	 * @example
	 * $mol_assert_ok( 0 ) // Passes
	 * $mol_assert_ok( 1 ) // Fails because Truthy
	 * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
	 */
	export function $mol_assert_not( value : any ) {
		if( !value ) return
		$mol_fail( new Error( `${value} ≠ false` ) )
	}
	
	/**
	 * Handler must throw an error.
	 * @example
	 * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } ) // Passes because throws error
	 * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , 'Parse error' ) // Passes because throws right message
	 * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , Error ) // Passes because throws right class
	 * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
	 */
	export function $mol_assert_fail( handler : ()=> any , ErrorRight? : any ) {
		
		const fail = $.$mol_fail
		
		try {
			$.$mol_fail = $.$mol_fail_hidden
			
			handler()

		} catch( error: any ) {
			
			if( !ErrorRight ) return error
			
			$.$mol_fail = fail

			if( typeof ErrorRight === 'string' ) {
				$mol_assert_equal( error.message, ErrorRight )
			} else {
				$mol_assert_ok( error instanceof ErrorRight )
			}
			
			return error

		} finally {
			$.$mol_fail = fail
		}

		$mol_fail( new Error( 'Not failed' ) )
	}
	
	/**
	 * All arguments must be equal.
	 * @example
	 * $mol_assert_equal( 1 , 1 , 1 ) // Passes
	 * $mol_assert_equal( 1 , 1 , 2 ) // Fails because 1 !== 2
	 * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
	 */
	export function $mol_assert_equal< Value >( ... args : [ Value, Value, ...Value[] ] ) {
		for( let i = 0 ; i < args.length ; ++i ) {
			for( let j = 0 ; j < args.length ; ++j ) {
				if( i === j ) continue
				if( Number.isNaN( args[i] as any as number ) && Number.isNaN( args[j] as any as number ) ) continue
				if( args[i] !== args[j] ) $mol_fail( new Error( `Not equal (${i+1}:${j+1})\n${ args[i] }\n${ args[j] }` ) )
			}
		}
	}
	
	/**
	 * All arguments must be not equal to each other.
	 * @example
	 * $mol_assert_unique( 1 , 2 , 3 ) // Passes
	 * $mol_assert_unique( 1 , 1 , 2 ) // Fails because 1 === 1
	 * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
	 */
	export function $mol_assert_unique( ... args : [ any, any, ...any[] ] ) {
		for( let i = 0 ; i < args.length ; ++i ) {
			for( let j = 0 ; j < args.length ; ++j ) {
				if( i === j ) continue
				if( args[i] === args[j] || ( Number.isNaN( args[i] as any as number ) && Number.isNaN( args[j] as any as number ) ) ) {
					$mol_fail( new Error( `args[${ i }] = args[${ j }] = ${ args[i] }` ) )
				}
			}
		}
	}
	
	/**
	 * All arguments must be like each other (deep structural comparison).
	 * @example
	 * $mol_assert_like( [1] , [1] , [1] ) // Passes
	 * $mol_assert_like( [1] , [1] , [2] ) // Fails because 1 !== 2
	 * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
	 */
	export function $mol_assert_like< Value >( head : Value, ... tail : Value[]) {
		for( let [ index, value ] of Object.entries( tail ) ) {

			if( !$mol_compare_deep( value , head ) ) {

				const print = ( val : any ) => {
					
					if( !val ) return val
					if( typeof val !== 'object' ) return val
					if( 'outerHTML' in val ) return val.outerHTML
					
					try {
						return JSON.stringify( val, null, '\t' )
					} catch( error: any ) {
						console.error( error )
						return val
					}
					
				}
				
				return $mol_fail( new Error( `Not like (1:${ + index + 2 })\n${ print( head ) }\n---\n${ print( value ) }` ) )

			}

		}
	}
	
	export function $mol_assert_dom( left: Element, right: Element ) {
		$mol_assert_equal( $mol_dom_serialize( left ), $mol_dom_serialize( right ) )
	}

}
