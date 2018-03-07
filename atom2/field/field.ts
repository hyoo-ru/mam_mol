namespace $ {

	export function $mol_atom2_field< Host , Value >(
		proto : Host ,
		name : string ,
		descr? : TypedPropertyDescriptor< Value > ,
	) {

		const store = new WeakMap< Object , $mol_atom2<Value> >()

		const value = proto[ name ]
		const get = descr ? descr.get : ( next = value )=> next
		const set = descr && $mol_fiber_func( descr.set )

		if( !descr ) {
			descr = {
				set( next : Value ) {
					get_atom( this ).value( next )
				}
			}
		}

		descr.get = function() {
			return get_atom( this ).value()
		}

		Object.defineProperty( proto , name , descr )

		Object.defineProperty( proto , name + '@' , {
			get : function() { return store.get( this ) }
		} )

		function get_atom( host : Host ) {
			
			let atom : $mol_atom2<Value> = store.get( host )
			if( atom ) return atom
				
			atom = new $mol_atom2< Value >(
				`${ host }.${ name }` , 
				get.bind( host ) ,
				()=> store.delete( host ) ,
			)
			
			store.set( host , atom )
			return atom
		}

		return descr as any
		
	}

}
