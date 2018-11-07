namespace $ {

	export function $mol_atom2_field<
		Host extends object ,
		Field extends keyof Host ,
		Value extends Host[ Field ]
	>(
		proto : Host ,
		name : Field ,
		descr? : TypedPropertyDescriptor< Value >
	) : any {
		
		if( !descr ) descr =  Object.getOwnPropertyDescriptor( proto , name )

		const get = descr ? ( descr.get || $mol_const( descr.value ) ) : ( ()=> {} )
		const set = descr && descr.set || ( ()=> {} )
		
		const store = new WeakMap< Host , $mol_fiber< Value > >()

		Object.defineProperty( proto , name + "@" , {
			get : function() {
				return store.get( this )
			}
		} )

		const get_cache = ( host : Host )=> {
			
			let cache = store.get( host )
			
			if( !cache ) {
				cache = new $mol_atom2
				cache.calculate = get.bind( host )
				cache[ Symbol.toStringTag ] = `${ host }.${ name }`
				store.set( host , cache )
			}

			return cache
		}

		return {
			
			get() {
				return get_cache( this ).get()
			},

			set( next : Value ) {
				
				// const slave = $mol_fiber.current 

				// let master = slave && slave.master as $mol_fiber< void >
				// if( !master ) {
				// 	master = new $mol_fiber
				// 	master.calculate = ()=> {
						set.call( this , next )
						get_cache( this ).done( next )
				// 	}
				// 	master[ Symbol.toStringTag ] = `${ this }.${ name }=`
				// }

				// master.get()

			}

		}

	}

}
