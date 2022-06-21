namespace $ {
	export function $mol_wire_patch( obj: object ) {
		
		for( const field of Reflect.ownKeys( obj ) ) {
			
			const descr = Reflect.getOwnPropertyDescriptor( obj, field )!
			if( !descr.configurable ) continue
			if( !descr.get ) continue
			
			const get = descr.get ?? ( ()=> descr.value )
			const set = descr.set ?? ( next => descr.value = next )
			
			Reflect.defineProperty( obj, field, {
				
				configurable: true,
				enumerable: descr.enumerable,
				
				get() {
					const atom = $mol_wire_atom.solo( obj, get )
					atom.watch()
					return atom.sync()
				},
				
				set( next ) {
					const atom = $mol_wire_atom.solo( obj, get )
					set.call( this, next )
					atom.refresh()
				},
				
			} )
			
		}
		
	}
}
