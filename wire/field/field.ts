namespace $ {
	
	export function $mol_wire_field<
		Host extends object ,
		Field extends keyof Host ,
		Value extends Host[ Field ],
	>(
		host : Host ,
		field : Field ,
		descr? : TypedPropertyDescriptor< Value >
	): any {

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( host , field )
		
		const _get = descr?.get || $mol_const( descr?.value )
		const persist = $mol_wire_fiber.persist( _get, 0 )
		
		const _set = descr?.set || function( this : Host , next ) {
			persist( this, [] ).put( next )
		}

		const sup = Reflect.getPrototypeOf( host )!
		const sup_descr = Reflect.getOwnPropertyDescriptor( sup, field )
		
		Object.defineProperty( _get , 'name' , { value : sup_descr?.get?.name ?? field } )
		Object.defineProperty( _set , 'name' , { value : sup_descr?.set?.name ?? field } )
		
		function get( this: Host ) {
			return persist( this, [] ).sync()
		}
		
		function set( this: Host, next: Value ) {
			$mol_wire_fiber.temp( this, _set, next ).sync()
		}
		
		Object.defineProperty( get , 'name' , { value : _get.name + '$' } )
		Object.defineProperty( set , 'name' , { value : _set.name + '@' } )
		
		Object.assign( get, { orig: _get } )
		Object.assign( set, { orig: _set } )
		
		const { value, writable, ... descr2 } = { ... descr, get, set }
		Reflect.defineProperty( host, field, descr2 )
		
		return descr2
	}

}
