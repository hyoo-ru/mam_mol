namespace $ {

	const a_stack = [] as any[]
	const b_stack = [] as any[]

	export function $mol_compare_deep< Value >( a : Value , b : Value ) : boolean {

		if( Object.is( a , b ) ) return true

		const a_type = typeof a
		const b_type = typeof b

		if( a_type !== b_type ) return false

		if( a_type === 'function' ) return String( a ) === String( b )
		if( a_type !== 'object' ) return false

		if( a instanceof Error ) return false
		if( a['constructor'] !== b['constructor'] ) return false

		if( a instanceof RegExp ) return Object.is( String( a ) , String( b ) )

		const ref = a_stack.indexOf( a )
		
		if( ref >= 0 ) {
			return Object.is( b_stack[ ref ] , b )
		}

		a_stack.push( a )
		b_stack.push( b )

		try {

			if( a[ Symbol.iterator ] ) {
				
				const a_iter = a[ Symbol.iterator ]()
				const b_iter = b[ Symbol.iterator ]()
	
				while( true ) {

					const a_next = a_iter.next()
					const b_next = b_iter.next()

					if( a_next.done !== a_next.done ) return false
					if( a_next.done ) break

					if( !$mol_compare_deep( a_next.value , b_next.value ) ) return false

				}

				return true

			}

			let count = 0

			for( let key in a ) {

				if( !$mol_compare_deep( a[key] , b[key] ) ) return false
				
				++ count

			}
	
			for( let _ in b ) if( -- count < 0 ) return false
	
			const a_val = a['valueOf']()
			if( Object.is( a_val , a ) ) return true
			
			const b_val = b['valueOf']()
			if( !Object.is( a_val , b_val ) ) return false

			return true

		} finally {
			a_stack.pop()
			b_stack.pop()
		}

	}

}
