namespace $ {
	
	export function $mol_assert_ok( value : any ) {
		if( value ) return
		throw new Error( `Not true (${value})` )
	}
	
	export function $mol_assert_not( value : any ) {
		if( !value ) return
		throw new Error( `Not false (${value})` )
	}
	
	export function $mol_assert_fail( handler : ()=> any , ErrorRight? : any ) {
		try {
			handler()
		} catch( error ) {
			if( ErrorRight ) $mol_assert_ok( error instanceof ErrorRight )
			return error
		}
		throw new Error( 'Not failed' )
	}
	
	export function $mol_assert_equal< Value >( ... args : Value[] ) {
		for( let i = 0 ; i < args.length ; ++i ) {
			for( let j = 0 ; j < args.length ; ++j ) {
				if( i === j ) continue
				if( args[i] !== args[j] ) throw new Error( `Not equal (${ args[i] }!==${ args[j] })` )
			}
		}
	}
	
	export function $mol_assert_unique( ... args : any[] ) {
		for( let i = 0 ; i < args.length ; ++i ) {
			for( let j = 0 ; j < args.length ; ++j ) {
				if( i === j ) continue
				if( args[i] === args[j] ) throw new Error( `Not unique (args[${ i }]===args[${ j }])===${ args[i] }` )
			}
		}
	}
	
}
