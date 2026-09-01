namespace $ {
	
	/** Incompatible with instance fields with initializators */
	export function $mol_wire_field<
		Host extends object ,
		Field extends keyof Host ,
		Value extends Host[ Field ],
	>(
		host : Host ,
		field : Field ,
		descr? : TypedPropertyDescriptor< Value >
	): any {

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( host , field ) as any
		
		const _get = descr?.get || $mol_const( descr?.value )
		const _set = descr?.set || function( this : Host , next ) {
			$mol_wire_atom.solo( this, _get ).put( next )
		}

		const sup = Reflect.getPrototypeOf( host )!
		const sup_descr = Reflect.getOwnPropertyDescriptor( sup, field )
		
		Object.defineProperty( _get , 'name' , { value : sup_descr?.get?.name ?? field } )
		Object.defineProperty( _set , 'name' , { value : sup_descr?.set?.name ?? field } )
		
		function get( this: Host ) {
			return $mol_wire_atom.solo( this, _get ).sync()
		}
		
		const temp = $mol_wire_task.getter( _set )
		function set( this: Host, next: Value ) {
			temp( this, [ next ] ).sync()
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
