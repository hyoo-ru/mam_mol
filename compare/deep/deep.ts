namespace $ {

	let cache = new WeakMap< any , WeakMap< any , boolean > >()

	export function $mol_compare_deep< Value >( left : Value , right : Value ) : boolean {

		if( Object.is( left , right ) ) return true

		if( left === null ) return false
		if( right === null ) return false

		if( typeof left !== 'object' ) return false
		if( typeof right !== 'object' ) return false

		if( left['constructor'] !== right['constructor'] ) return false

		let left_cache = cache.get( left )
		if( left_cache ) {

			const right_cache = left_cache.get( right )
			if( typeof right_cache === 'boolean' ) return right_cache
			
		} else {
			
			left_cache = new WeakMap< any , boolean >()
			cache.set( left , left_cache )
			left_cache.set( right, true )

		}

		if( left instanceof RegExp ) return left.toString() === right['toString']()
		if( left instanceof Date ) return Object.is( left.valueOf(), right['valueOf']() )

		let result! : boolean

		try {

			if( Symbol.iterator in left ) {
				
				const left_iter = left[ Symbol.iterator ]()
				const right_iter = right[ Symbol.iterator ]()
	
				while( true ) {

					const left_next = left_iter.next()
					const right_next = right_iter.next()

					if( left_next.done !== right_next.done ) return result = false
					if( left_next.done ) break

					if( !$mol_compare_deep( left_next.value , right_next.value ) ) return result = false

				}

				return result = true

			}
			
			if( left['constructor'] !== ({}).constructor ) return result = false

			let count = 0

			for( let key in left ) {

				try {

					if( !$mol_compare_deep( left[key] , right[key] ) ) return result = false
				
				} catch( error: any ) {

					$mol_fail_hidden( new $mol_error_mix( `Failed ${ JSON.stringify( key ) } fields comparison of ${left} and ${right}` , error ) )

				}
				
				++ count

			}
	
			for( let key in right ) {

				--count
				
				if( count < 0 ) return result = false
				
			}
			
			return result = true

		} finally {
			
			left_cache.set( right , result )

		}

	}

}
