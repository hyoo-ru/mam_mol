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
		} catch( error ) {
			if( ErrorRight ) if(!( error instanceof ErrorRight )) throw error
			return error
		} finally {
			$.$mol_fail = fail
		}
		$mol_fail( new Error( 'Not failed' ) )
	}
	
	export function $mol_assert_equal< Value >( ... args : Value[] ) {
		for( let i = 0 ; i < args.length ; ++i ) {
			for( let j = 0 ; j < args.length ; ++j ) {
				if( i === j ) continue
				if( Number.isNaN( args[i] as any as number ) && Number.isNaN( args[j] as any as number ) ) continue
				if( args[i] !== args[j] ) $mol_fail( new Error( `Not equal\n${ args[i] }\n${ args[j] }` ) )
			}
		}
	}
	
	export function $mol_assert_unique( ... args : any[] ) {
		for( let i = 0 ; i < args.length ; ++i ) {
			for( let j = 0 ; j < args.length ; ++j ) {
				if( i === j ) continue
				if( args[i] === args[j] || ( Number.isNaN( args[i] as any as number ) && Number.isNaN( args[j] as any as number ) ) ) {
					$mol_fail( new Error( `args[${ i }] = args[${ j }] = ${ args[i] }` ) )
				}
			}
		}
	}
	
	export function $mol_assert_like< Value >( head : Value , ... tail : Value[] ) {
		for( let value of tail ) {
			value = $mol_conform( value , head )
			if( Number.isNaN( value as any as number ) && Number.isNaN( head as any as number ) ) continue
			if( head !== value ) $mol_fail( new Error( `Not like\n${ head }\n${ value }` ) )
			head = value
		}
	}
	
}
