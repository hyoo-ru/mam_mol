namespace $ {
	
	// Prevent implicit cast objects to primitive (except boolean).
	Object.prototype[ Symbol.toPrimitive ] = function() {
		return $.$mol_fail(
			new TypeError( `Field Symbol(Symbol.toPrimitive) is not defined` )
		)
	}
	
	// Prevent prototype pollution
	delete Object.prototype['__proto__']
	
	// Prevent return undefined for fields which isn't defined.
	// Works for every classes derived from Object but not for Object (including all literals).
	
	export let $mol_strict_object = new Proxy( {}, {
		get( obj: object, field: PropertyKey, proxy: object ) {
			const name = JSON.stringify( String( field ) )
			return $.$mol_fail(
				new TypeError( `Field ${ name } is not defined` )
			)
		},
	})
	
	// Object can't be changed but we replaces Object by custom subclass for inheritance purposes.
	const Object_orig = $.Object
	$.Object = function $mol_strict_object( this: object, arg: any ) {
		let res = Object_orig.call( this, arg )
		return this instanceof $mol_strict_object ? this : res
	} as ObjectConstructor
	Reflect.setPrototypeOf( $.Object, Object_orig )
	
	// Replace Object.prototype by $mol_strict_object for all global classes
	for( const name of Reflect.ownKeys( $ ) ) {
		
		const func = Reflect.getOwnPropertyDescriptor( $, name )!.value
		if( typeof func !== 'function' ) continue
		if(!( 'prototype' in func )) continue
		if( name === 'CSSStyleDeclaration' ) continue
		
		const proto = func.prototype
		if( Reflect.getPrototypeOf( proto ) !== Object_orig.prototype ) continue
		
		Reflect.setPrototypeOf( proto, $mol_strict_object )
		
	}
	
	// Fix arrays concatenation
	Array.prototype[ Symbol.isConcatSpreadable ] = true
	
}
