namespace $ {

	const cache = new WeakMap< any , boolean >()

	export const $mol_conform_stack = [] as any[]

	export function $mol_conform< Target , Source >( target : Target , source : Source ) : Target {

		if( Object.is( target , source ) ) return source as any

		if( !target || typeof target !== 'object' ) return target
		if( !source || typeof source !== 'object' ) return target

		if( target instanceof Error ) return target
		if( source instanceof Error ) return target
		
		if( target['constructor'] !== source['constructor'] ) return target

		if( cache.get( target ) ) return target
		cache.set( target , true )
		
		const conform = $mol_conform_handlers.get( target['constructor'] )
		if( !conform ) return target

		if( $mol_conform_stack.indexOf( target ) !== -1 ) return target

		$mol_conform_stack.push( target )

		try { return conform( target , source ) }
		finally { $mol_conform_stack.pop() }

	}

	export const $mol_conform_handlers = new WeakMap< Object , ( target : any , source : any )=> any >()

	export function $mol_conform_handler< Class >(
		cl : { new( ... args : any[] ) : Class } ,
		handler : ( target : Class , source : Class )=> Class ,
	) {
		$mol_conform_handlers.set( cl , handler )
	}

	export function $mol_conform_array<
		Value ,
		List extends {
			[ index : number ] : Value
			length : number
		} ,
	>( target : List , source : List ) {
		
		if( source.length !== target.length ) return target
		
		for( let i = 0 ; i < target.length ; ++i ) {
			if( !Object.is( source[i] , target[i] ) ) return target
		}

		return source
	}

	$mol_conform_handler( Array , $mol_conform_array )
	
	$mol_conform_handler( Int8Array , $mol_conform_array )
	$mol_conform_handler( Int16Array , $mol_conform_array )
	$mol_conform_handler( Int32Array , $mol_conform_array )
	$mol_conform_handler( BigInt64Array , $mol_conform_array )
	
	$mol_conform_handler( Uint8Array , $mol_conform_array )
	$mol_conform_handler( Uint16Array , $mol_conform_array )
	$mol_conform_handler( Uint32Array , $mol_conform_array )
	$mol_conform_handler( BigUint64Array , $mol_conform_array )

	$mol_conform_handler( Float32Array , $mol_conform_array )
	$mol_conform_handler( Float64Array , $mol_conform_array )

	$mol_conform_handler( ({})['constructor'] as any , ( target: Object, source )=> {

		let count = 0
		let equal = true

		for( let key in target ) {

			const conformed = $mol_conform( target[ key as never ] , source[ key as never ] )
			
			if( conformed !== target[ key as never ] ) {
				try { target[ key as never ] = conformed } catch( error: any ) {}
				if( !Object.is( conformed , target[ key as never ] ) ) equal = false
			}
			
			if( !Object.is( conformed , source[ key as never ] ) ) equal = false
			
			++ count
		}

		for( let key in source ) if( -- count < 0 ) break

		return ( equal && count === 0 ) ? source : target
	} )

	$mol_conform_handler( Date , ( target , source )=> {
		if( target.getTime() === source.getTime() ) return source
		return target 
	} )

	$mol_conform_handler( RegExp , ( target , source )=> {
		if( target.toString() === source.toString() ) return source
		return target
	} )

}
