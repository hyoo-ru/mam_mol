namespace $ {
	
	/**
	 * Argument must be Truthy
	 * @deprecated use $mol_assert_equal instead
	 */
	export function $mol_assert_ok( value : any ) {
		if( value ) return
		$mol_fail( new Error( `${value} ≠ true` ) )
	}
	
	/**
	 * Argument must be Falsy
	 * @deprecated use $mol_assert_equal instead
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
	export function $mol_assert_fail(
		handler: ()=> any ,
		ErrorRight: string | typeof Error | typeof Promise
	) {
		
		const fail = $.$mol_fail
		
		try {
			$.$mol_fail = $.$mol_fail_hidden
			
			handler()

		} catch( error: any ) {
			
			$.$mol_fail = fail

			if( typeof ErrorRight === 'string' ) {
				$mol_assert_equal( error.message ?? error, ErrorRight )
			} else {
				$mol_assert_equal( error instanceof ErrorRight, true )
			}
			
			return error

		} finally {
			$.$mol_fail = fail
		}

		$mol_fail( new Error( 'Not failed' ) )
	}
	
	/** @deprecated Use $mol_assert_equal */
	export function $mol_assert_like< Value >( ... args : [ Value, Value, ...Value[] ] ) {
		$mol_assert_equal( ... args )
	}
	
	/**
	 * All arguments must not be structural equal to each other.
	 * @example
	 * $mol_assert_unique( 1 , 2 , 3 ) // Passes
	 * $mol_assert_unique( 1 , 1 , 2 ) // Fails because 1 === 1
	 * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
	 */
	export function $mol_assert_unique( ... args : [ any, any, ...any[] ] ) {
		
		for( let i = 0 ; i < args.length ; ++i ) {
			for( let j = 0 ; j < args.length ; ++j ) {
				
				if( i === j ) continue
				if( !$mol_compare_deep( args[i], args[j] ) ) continue
				
				return $mol_fail( new Error(
					`Uniquesess assertion failure`,
					{ cause: { [i]: args[i], [i]: args[i] } },
				) )
				
			}
		}
		
	}
	
	/**
	 * All arguments must be structural equal each other.
	 * @example
	 * $mol_assert_like( [1] , [1] , [1] ) // Passes
	 * $mol_assert_like( [1] , [1] , [2] ) // Fails because 1 !== 2
	 * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
	 */
	export function $mol_assert_equal< Value >( ... args : Value[] ) {
		for( let i = 1 ; i < args.length ; ++i ) {
			
			if( $mol_compare_deep( args[0] , args[i] ) ) continue
			if( args[0] instanceof $mol_dom_context.Element && args[i] instanceof $mol_dom_context.Element && args[0].outerHTML === ( args[i] as Element ).outerHTML ) continue
			
			return $mol_fail( new Error(
				`Equality assertion failure`,
				{ cause: { 0: args[0], [i]: args[i] } },
			) )
			
		}
	}
	
}
