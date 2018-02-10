namespace $ {
	
	export function $mol_mem< Host , Value >(
		obj? : Host ,
		name? : string ,
		descr? : TypedPropertyDescriptor< ( next? : Value , force? : $mol_atom_force )=> Value >
	) {

		const value = descr.value
		const store = new WeakMap< Object , $mol_atom<Value> >()
		
		descr.value = function $mol_mem_value( next? : Value , force? : $mol_atom_force ) {
			const host : any = this
		
			let atom : $mol_atom<Value> = store.get( host )
			if( !atom ) {
				
				const id = `${ host }.${ name }()`
				atom = new $mol_atom<Value>( id , function() {
					const v = value.apply( host , arguments )
					if( v instanceof $mol_object ) {
						if( !v.object_host() ) {
							v.object_host( host )
							v.object_field( name )
							v.object_id( id )
						}
					}
					return v
				} )

				atom.object_owner( host )
				
				const destructor = atom.destructor
				atom.destructor = ()=> {
					store.delete( host )
					destructor.call( atom )
				}

				store.set( host , atom )
			}
			
			return atom.value( next , force )
		}
		
		Object.defineProperty( obj , name + "()" , { get : function() { return store.get( this ) } } )

		descr.value[ 'value' ] = value
	}
	
	export function $mol_mem_key< Host , Key , Value >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( key : Key , next? : Value , force? : $mol_atom_force )=> Value >
	) {
		const value = descr.value
		const store = new WeakMap< Object , { [ key : string ] : $mol_atom<Value> } >()
		
		descr.value = function $mol_mem_key_value( key : Key , next : Value , force? : $mol_atom_force ) {
			const host : any = this
			const key_str = JSON.stringify( key )
			
			let dict = store.get( host )
			if( !dict ) store.set( host , dict = {} )
			
			let atom : $mol_atom<Value> = dict[ key_str ]
			if( !atom ) {
				
				const id = `${ host }.${ name }(${ key_str })`
				atom = new $mol_atom<Value>( id , function( ... args: any[] ) {
					const v = value.apply( host , [ key , ... args ] )
					if( v instanceof $mol_object ) {
						if( !v.object_host() ) {
							v.object_host( host )
							v.object_field( name )
							v.object_id( id )
						}
					}
					return v
				} )

				const destructor = atom.destructor
				atom.destructor = ()=> {
					delete dict[ key_str ]
					destructor.call( atom )
				}

				dict[ key_str ] = atom

			}
			
			return atom.value( next , force )
		}
		
		Object.defineProperty( obj , name + "()" , { get : function() { return store.get( this ) } } )
		void( ( descr.value as any )[ 'value' ] = value )
	}
	
}
