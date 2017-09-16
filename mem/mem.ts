namespace $ {
	
	export function $mol_mem< Host , Value >(
		obj? : Host ,
		name? : string ,
		descr? : TypedPropertyDescriptor< ( next? : Value , force? : $mol_atom_force )=> Value >
	) {

		const value = descr.value
		const store = new WeakMap< Object , $mol_atom<Value> >()
		
		descr.value = function( next? : Value , force? : $mol_atom_force ) {
			const host : any = this
		
			let atom : $mol_atom<Value> = store.get( host )
			if( !atom ) {
				if( force && ( next === undefined ) ) return next
				
				store.set( host , atom = new $mol_atom<Value>(
					host ,
					value.bind( host ) ,
					name + '()' ,
				) )
			}
			
			return atom.value( next , force )
		}
		
		Object.defineProperty( obj , name + "()" , { get : function() { return store.get( this ) } } )

		descr.value[ 'value' ] = value

		return descr
	}
	
	export function $mol_mem_key< Host , Key , Value >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( key : Key , next? : Value , force? : $mol_atom_force )=> Value >
	) {
		const value = descr.value
		const store = new WeakMap< Object , { [ key : string ] : $mol_atom<Value> } >()
		
		descr.value = function( key : Key , next : Value , force? : $mol_atom_force ) {
			const host : any = this
			const key_str = JSON.stringify( key )
			
			let dict = store.get( host )
			if( !dict ) store.set( host , dict = {} )
			
			let atom : $mol_atom<Value> = dict[ key_str ]
			if( !atom ) {
				if( force && ( next === undefined ) ) return next
				
				dict[ key_str ] = atom = new $mol_atom<Value>(
					host ,
					value.bind( host , key ) ,
					name + "(" + key_str + ")" ,
				)

			}
			
			return atom.value( next , force )
		}
		
		Object.defineProperty( obj , name + "()" , { get : function() { return store.get( this ) } } )
		void( ( descr.value as any )[ 'value' ] = value )

		return descr
	}
	
}
