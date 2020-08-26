namespace $ {

	const instances = new WeakSet< any >()

	/**
	 * Proxy that delegates all to lazy returned target.
	 * 
	 * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
	 */
    export function $mol_delegate< Value extends object >(
		proto : Value ,
		target : ()=> Value ,
	) {

		const proxy = new Proxy( proto , {

			get: ( _ , field )=> {
				const obj = target()
				let val = Reflect.get( obj , field )
				if( typeof val === 'function' ) {
					val = val.bind( obj )
				} 
				return val
			},
			has: ( _ , field )=> Reflect.has( target(), field ),
			set: ( _ , field , value )=> Reflect.set( target() , field , value ),
			
			getOwnPropertyDescriptor: ( _ , field )=> Reflect.getOwnPropertyDescriptor( target() , field ),
			ownKeys: ()=> Reflect.ownKeys( target() ),
			
			getPrototypeOf: ()=> Reflect.getPrototypeOf( target() ),
			setPrototypeOf: ( _ , donor )=> Reflect.setPrototypeOf( target() , donor ),
			
			isExtensible: ()=> Reflect.isExtensible( target() ),
			preventExtensions: ()=> Reflect.preventExtensions( target() ),
			
			apply: ( _ , self , args )=> Reflect.apply( target() as Function , self , args ),
			construct: ( _ , args , retarget )=> Reflect.construct( target() as Function , args , retarget ),
			
			defineProperty: ( _ , field , descr )=> Reflect.defineProperty( target() , field , descr ),
			deleteProperty: ( _ , field )=> Reflect.deleteProperty( target() , field ),

		} )

		instances.add( proxy )

		return proxy

	}

	Reflect.defineProperty(
		$mol_delegate ,
		Symbol.hasInstance ,
		{
			value : ( obj : object )=> instances.has( obj ),
		},
	)

}
