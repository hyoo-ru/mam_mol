namespace $ {

	export function $mol_atom2_dict< Key extends string | number | symbol , Value >(
		get : ( key : Key , dict : Record< Key , Value > )=> Value = ()=> undefined ,
		set : ( value : Value , key : Key )=> Value = value => value ,
	) {

		const store = new $mol_object2 as unknown as Record< Key , $mol_atom2< Value > >

		let keys : $mol_atom2< number >
		
		const get_keys = ()=> {
			
			if( !keys ) {
				keys = new $mol_atom2< number >()
				keys[ Symbol.toStringTag ] = `Object.keys(${ store })`
				keys.done( undefined )
			}

			return keys
		}
		
		const get_cache = ( key : Key )=> {
			let cache = store[ key ]
			if( !cache ) {
				cache = new $mol_atom2
				cache.calculate = get.bind( null , key , proxy )
				cache[ Symbol.toStringTag ] = `${ store }[${ key }]`
				store[ key ] = cache
				if( keys ) keys.obsolete_slaves()
			}
			return cache
		}
		
		const proxy = new Proxy( store , {

			get( store , key : Key , proxy ) {
				if( key in $mol_object2.prototype ) return store[ key ]
				return get_cache( key ).get()
			} ,

			set( store , key : Key , value : Value , proxy ) {
				
				if( key in $mol_object2.prototype ) {
					store[ key ] = value as any
				} else {
					get_cache( key ).done( set.call( null , value , key ) )
				}

				return true
			} ,

			ownKeys( store ) {
				get_keys().get()
				return Object.keys( store )
			} ,

		} ) as unknown as Record< Key , Value >

		return proxy

	}
	
}
