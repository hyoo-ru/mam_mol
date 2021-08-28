namespace $ {
	
	export function $mol_assert_ok( value : any ) {
		if( value ) return
		$mol_fail( new Error( `${value} ≠ true` ) )
	}
	
	export function $mol_assert_not( value : any ) {
		if( !value ) return
		$mol_fail( new Error( `${value} ≠ false` ) )
	}
	
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
	
	export function $mol_assert_equal< Value >( ... args : [ Value, Value, ...Value[] ] ) {
		for( let i = 0 ; i < args.length ; ++i ) {
			for( let j = 0 ; j < args.length ; ++j ) {
				if( i === j ) continue
				if( Number.isNaN( args[i] as any as number ) && Number.isNaN( args[j] as any as number ) ) continue
				if( args[i] !== args[j] ) $mol_fail( new Error( `Not equal (${i+1}:${j+1})\n${ args[i] }\n${ args[j] }` ) )
			}
		}
	}
	
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
	
	export function $mol_assert_like< Value >( head : Value, ... tail : Value[]) {
		for( let [ index, value ] of Object.entries( tail ) ) {

			if( !$mol_compare_deep( value , head ) ) {

				const print = ( val : any ) => {
					
					if( !val ) return val
					if( typeof val !== 'object' ) return val
					if( 'outerHTML' in val ) return val.outerHTML
					
					try {
						return JSON.stringify( val )
					} catch( error: any ) {
						console.error( error )
						return val
					}
					
				}
				
				return $mol_fail( new Error( `Not like (1:${ + index + 2 })\n${ print( head ) }\n---\n${ print( value ) }` ) )

			}

		}
	}
	
}
