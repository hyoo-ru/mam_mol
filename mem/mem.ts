namespace $ {
	
	export function $mol_mem< Host , Value >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( next? : Value , force? : $mol_atom_force )=> Value >
	) {

		const value = descr.value!
		const store = new WeakMap< Object , $mol_atom<Value> >()
		
		descr.value = function $mol_mem_value( next? : Value , force? : $mol_atom_force ) {
			const host : any = this
		
			let atom = store.get( host )
			if( !atom ) {
				
				const id = `${ host }.${ name }()`
				atom = new $mol_atom<Value>( id , function( ... args : any[] ) {
					const v = value.call( host , ... args )
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
		const value = descr.value!
		const store = new WeakMap< Object , Map< any , $mol_atom<Value> > >()
		
		descr.value = function $mol_mem_key_value( key : Key , next? : Value , force? : $mol_atom_force ) {
			const host : any = this
			
			let dict = store.get( host )
			if( !dict ) store.set( host , dict = new $mol_dict )
			
			let atom = dict.get( key )
			if( !atom ) {
				
				const id = `${ host }.${ name }(${ JSON.stringify( key ) })`
				atom = new $mol_atom<Value>( id , function( ... args: any[] ) {
					const v = value.call( host , key , ... args )
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
					dict!.delete( key )
					destructor.call( atom )
				}

				dict.set( key , atom )

			}
			
			return atom.value( next , force )
		}
		
		Object.defineProperty( obj , name + "()" , { get : function() { return store.get( this ) } } )
		void( ( descr.value as any )[ 'value' ] = value )
	}
	
}
