namespace $ {

	const left_stack = [] as any[]
	const right_stack = [] as any[]

	let cache = new WeakMap< any , WeakMap< any , boolean > >()

	export function $mol_compare_deep< Value >( left : Value , right : Value ) : boolean {

		if( Object.is( left , right ) ) return true

		const left_type = typeof left
		const right_type = typeof right

		if( left_type !== right_type ) return false

		if( left_type === 'function' ) return left['toString']() === right['toString']()
		if( left_type !== 'object' ) return false

		if( !left || !right ) return false

		if( left instanceof Error ) return false
		if( left['constructor'] !== right['constructor'] ) return false

		if( left instanceof RegExp ) return left.toString() === right['toString']()

		const ref = left_stack.indexOf( left )
		
		if( ref >= 0 ) {
			return Object.is( right_stack[ ref ] , right )
		}

		let left_cache = cache.get( left )
		if( left_cache ) {

			const b_cache = left_cache.get( right )
			if( typeof b_cache === 'boolean' ) return b_cache

		} else {

			left_cache = new WeakMap< any , boolean >()
			cache.set( left , left_cache )

		}

		left_stack.push( left )
		right_stack.push( right )

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
			
			if( left instanceof Number || left instanceof String || left instanceof Symbol || left instanceof Boolean || left instanceof Date ) {
				if( !Object.is( left['valueOf'](), right['valueOf']() ) ) return result = false
			}

			return result = true

		} finally {
			
			left_stack.pop()
			right_stack.pop()
			left_cache.set( right , result )

		}

	}

}
