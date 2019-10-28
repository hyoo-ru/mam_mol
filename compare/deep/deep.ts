namespace $ {

	const a_stack = [] as any[]
	const b_stack = [] as any[]

	let cache = null as null | WeakMap< any , WeakMap< any , boolean > >

	export function $mol_compare_deep< Value >( a : Value , b : Value ) : boolean {

		if( Object.is( a , b ) ) return true

		const a_type = typeof a
		const b_type = typeof b

		if( a_type !== b_type ) return false

		if( a_type === 'function' ) return String( a ) === String( b )
		if( a_type !== 'object' ) return false

		if( !a || !b ) return false

		if( a instanceof Error ) return false
		if( a['constructor'] !== b['constructor'] ) return false

		if( a instanceof RegExp ) return Object.is( String( a ) , String( b ) )

		const ref = a_stack.indexOf( a )
		
		if( ref >= 0 ) {
			return Object.is( b_stack[ ref ] , b )
		}

		if( !cache ) cache = new WeakMap

		let a_cache = cache.get( a )
		if( a_cache ) {

			const b_cache = a_cache.get( b )
			if( typeof b_cache === 'boolean' ) return b_cache

		} else {

			a_cache = new WeakMap< any , boolean >()
			cache.set( a , a_cache )

		}

		a_stack.push( a )
		b_stack.push( b )

		let result : boolean

		try {

			if( a[ Symbol.iterator ] ) {
				
				const a_iter = a[ Symbol.iterator ]()
				const b_iter = b[ Symbol.iterator ]()
	
				while( true ) {

					const a_next = a_iter.next()
					const b_next = b_iter.next()

					if( a_next.done !== a_next.done ) return result = false
					if( a_next.done ) break

					if( !$mol_compare_deep( a_next.value , b_next.value ) ) return result = false

				}

				return true

			}

			let count = 0

			for( let key in a ) {

				if( !$mol_compare_deep( a[key] , b[key] ) ) return result = false
				
				++ count

			}
	
			for( let key in b ) {

				--count
				
				if( count < 0 ) return false
				
			}
	
			const a_val = a['valueOf']()
			if( Object.is( a_val , a ) ) return result = true
			
			const b_val = b['valueOf']()
			if( !Object.is( a_val , b_val ) ) return result = false

			return result = true

		} finally {
			
			a_stack.pop()
			b_stack.pop()

			if( a_stack.length === 0 ) {
				cache = null
			} else {
				a_cache.set( b , result )
			}

		}

	}

}
