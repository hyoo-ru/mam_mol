namespace $ {
	
	type Block = {
		from: number
		size: number
		next: Block
	}
	
	/**
	 * Simple memory allocator.
	 * Holds linked list of free blocks.
	 * Prefers blocks from the beginning.
	 * Near blocks are joined automatically.
 	 */
	export class $mol_memory_pool extends Object {
		
		_free: Block
		
		constructor( size = Number.POSITIVE_INFINITY ) {
			
			super()
			
			this._free = {
				from: -1,
				size: 0,
				next: {
					from: 0,
					size,
					next: null!,
				}
			}
			
		}
		
		/** Returns offset of first free block with required size. */
		acquire( size: number ) {
			
			let prev = this._free
			let next = prev.next
			let max = 0
			
			while( next.size < size ) {
				
				if( next.size > max ) max = next.size
				
				prev = next
				next = next.next
				
				if( !next ) $mol_fail( new Error( `No free space\nneed: ${ size }\nhave: ${ max }` ) )
				
			}
			
			const from = next.from
			
			if( next.size === size ) {
				prev.next = next.next
			} else {
				next.from += size
				next.size -= size
			}
			
			return from
		}
		
		/** Allows memory range to be acquired. */
		release( from: number, size: number ) {
			
			let prev = this._free
			let next = prev.next
			
			while( next.from < from ) {
				prev = next
				next = next.next
				
				if( !next ) $mol_fail( new Error( 'Release out of allocated' ) )
			}
			
			if(( from + size > next.from )||( prev.from + prev.size > from )) {
				$mol_fail( new Error( 'Double release', { cause: { prev, next, from, size } } ) )
			}
			
			const begin = prev.from + prev.size === from
			const end = from + size === next.from
			
			if( begin ) {
				
				if( end ) {
					prev.size += size + next.size
					prev.next = next.next
				} else {
					prev.size += size
				}
				
			} else {
				
				if( end ) {
					next.from -= size
					next.size += size
				} else {
					prev.next = { from, size, next }
				}
				
			}
			
		}
		
		acquired() {
			
		}
		
	}
	
}
