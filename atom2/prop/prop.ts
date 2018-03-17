namespace $ {

	export function $mol_atom2_prop< Host , Value >(
		obj? : Host ,
		name? : string ,
		descr? : TypedPropertyDescriptor< ( next? : Value )=> Value >
	) {

		const value = descr.value
		const store = new WeakMap< Object , $mol_atom2<Value> >()
		
		descr.value = function $mol_atom2_prop_value( next? : Value ) {
			const host : Host = this
		
			let atom : $mol_atom2<Value> = store.get( host )
			if( !atom ) {
				
				atom = new $mol_atom2<Value>(
					`${ host }.${ name }()` ,
					value.bind( host ) ,
					()=> store.delete( host ) ,
				)

				store.set( host , atom )
			}

			return atom.value( next )
		}
		
		Object.defineProperty( obj , name + "()" , { get : function() { return store.get( this ) } } )

		descr.value[ 'value' ] = value
	}
	
}
