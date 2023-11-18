namespace $ {

	export let $mol_compare_deep_cache = new WeakMap< any , WeakMap< any , boolean > >()
	
	/**
	 * Deeply compares two values. Returns true if equal.
	 * Define `Symbol.toPrimitive` to customize.
	 */
	export function $mol_compare_deep< Value >( left: Value, right: Value ): boolean {

		if( Object.is( left , right ) ) return true

		if( left === null ) return false
		if( right === null ) return false

		if( typeof left !== 'object' ) return false
		if( typeof right !== 'object' ) return false

		const left_proto = Reflect.getPrototypeOf( left as any )
		const right_proto = Reflect.getPrototypeOf( right as any )
		
		if( left_proto !== right_proto ) return false

		if( left instanceof Boolean ) return Object.is( left.valueOf(), ( right as any )['valueOf']() )
		if( left instanceof Number ) return Object.is( left.valueOf(), ( right as any )['valueOf']() )
		if( left instanceof String ) return Object.is( left.valueOf(), ( right as any )['valueOf']() )
		if( left instanceof Date ) return Object.is( left.valueOf(), ( right as any )['valueOf']() )
		if( left instanceof RegExp ) return left.source === (right as any).source && left.flags === (right as any).flags
		if( left instanceof Error ) return left.message === (right as any).message && left.stack === (right as any).stack

		let left_cache = $mol_compare_deep_cache.get( left )
		if( left_cache ) {

			const right_cache = left_cache.get( right )
			if( typeof right_cache === 'boolean' ) return right_cache

		} else {
			
			left_cache = new WeakMap< any , boolean >([[ right, true ]])
			$mol_compare_deep_cache.set( left , left_cache )

		}

		let result!: boolean

		try {
			
			if( !left_proto ) result = compare_pojo( left, right as any )
			else if( !Reflect.getPrototypeOf( left_proto ) ) result = compare_pojo( left, right as any )
			else if( Symbol.toPrimitive in left ) result = compare_primitive( left, right )
			else if( Array.isArray( left ) ) result = compare_array( left, right as any )
			else if( left instanceof Set ) result = compare_set( left, right as any )
			else if( left instanceof Map ) result = compare_map( left, right as any )
			else if( ArrayBuffer.isView( left ) ) result = compare_buffer( left, right as any )
			else if( Symbol.iterator in left ) result = compare_iterator( ( left as any )[ Symbol.iterator ](), ( right as any )[ Symbol.iterator ]() )
			else result = false

		} finally {
			left_cache.set( right , result )
		}
		
		return result
	}

	function compare_array< Value extends any[] >( left: Value, right: Value ): boolean {
		
		const len = left.length
		if( len !== right.length ) return false
		
		for( let i = 0; i < len; ++i ) {
			if( !$mol_compare_deep( left[i] , right[i] ) ) return false
		}
		
		return true
	}
	
	function compare_buffer( left: ArrayBufferView, right: ArrayBufferView ): boolean {
		
		if( left instanceof DataView ) return compare_buffer(
			new Uint8Array( left.buffer, left.byteOffset, left.byteLength ),
			new Uint8Array( right.buffer, left.byteOffset, left.byteLength ),
		)
		
		const len = left.byteLength
		if( len !== right.byteLength ) return false
		
		for( let i = 0; i < len; ++i ) {
			if( (left as any)[i] !== (right as any)[i] ) return false
		}
		
		return true
	}
	
	function compare_iterator< Value extends IterableIterator<any> >(
		left: Value,
		right: Value,
	): boolean {
		
		while( true ) {

			const left_next = left.next()
			const right_next = right.next()

			if( left_next.done !== right_next.done ) return false
			if( left_next.done ) break

			if( !$mol_compare_deep( left_next.value , right_next.value ) ) return false

		}

		return true

	}
	
	function compare_set< Value extends Set<any> >( left: Value, right: Value ): boolean {
		if( left.size !== right.size ) return false
		return compare_iterator( left.values(), right.values() )
	}
	
	function compare_map< Key, Value >( left: Map< Key, Value > , right: Map< Key, Value > ): boolean {
		if( left.size !== right.size ) return false
		return compare_iterator( left.keys(), right.keys() )
			&& compare_iterator( left.values(), right.values() )
	}
	
	function compare_pojo( left: {}, right: {} ): boolean {
		
		const left_keys = Object.getOwnPropertyNames( left )
		const right_keys = Object.getOwnPropertyNames( right )
		
		if( !compare_array( left_keys, right_keys ) ) return false

		for( let key of left_keys ) {
			if( !$mol_compare_deep( ( left as any )[ key ], ( right as any )[ key ] ) ) return false
		}

		const left_syms = Object.getOwnPropertySymbols( left )
		const right_syms = Object.getOwnPropertySymbols( right )
		
		if( !compare_array( left_syms, right_syms ) ) return false

		for( let key of left_syms ) {
			if( !$mol_compare_deep( ( left as any )[ key ], ( right as any )[ key ] ) ) return false
		}

		return true
	}
	
	function compare_primitive( left: {}, right: {} ): boolean {
		return Object.is(
			(left as any)[ Symbol.toPrimitive ]( 'default' ),
			(right as any)[ Symbol.toPrimitive ]( 'default' ),
		)
	}
	
}
