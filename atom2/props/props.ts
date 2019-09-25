namespace $ {

	export function $mol_atom2_props< Host , Key , Value >(
		obj? : Host ,
		name? : string ,
		descr? : TypedPropertyDescriptor< ( key : Key , next? : Value )=> Value >
	) {

		const value = descr.value
		const store = new WeakMap< Object , { [ key : string ] : $mol_atom2<Value> } >()
		
		descr.value = function $mol_atom2_props_value( key : Key , next? : Value , force? : $mol_atom_force ) {
			
			if(force)console.warn('force')

			const host : Host = this
			const key_str = JSON.stringify( key ) || ''
		
			let dict = store.get( host )
			if( !dict ) store.set( host , dict = {} )
			
			let atom : $mol_atom2<Value> = dict[ key_str ]
			if( !atom ) {
				
				atom = new $mol_atom2<Value>()
				atom[ Symbol.toStringTag ] = `${ host }.${ name }(${key_str})`
				atom.calculate = value.bind( host , key )
				atom.abort = ()=> {
					dict[ key_str ] = null
					atom.forget()
					return true
				}
				$mol_owning_catch( this , atom )

				dict[ key_str ] = atom
			}

			if( next === undefined ) return atom.get()
			next = value.call( host , key , next )
			atom.put( next )
			return next
		}
		
		Object.defineProperty( obj , name + "()" , { get : function() { return store.get( this ) } } )

		descr.value[ 'value' ] = value
	}
	
}
