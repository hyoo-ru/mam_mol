namespace $ {

	const cache = new WeakMap< any , boolean >()

	export const $mol_conform_stack = [] as any[]

	export function $mol_conform< Target , Source >( target : Target , source : Source ) : Target {

		if( target as any === source as any ) return source as any

		if( !target || typeof target !== 'object' ) return target
		if( !source || typeof source !== 'object' ) return target

		if( target instanceof Error ) return target
		if( source instanceof Error ) return target
		
		if( target.constructor !== source.constructor ) return target

		if( cache.get( target ) ) return target
		cache.set( target , true )
		
		const conform = $mol_conform_handlers.get( target.constructor )
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

	$mol_conform_handler( Array , ( target , source )=> {
		
		let equal = target.length === source.length

		for( let i = 0 ; i < target.length ; ++i ) {
			const conformed = $mol_conform( target[i] , source[i] )
			if( conformed !== target[i] ) {
				try { target[i] = conformed }
				catch( error ) { equal = false }
			}
			if( equal && conformed !== source[i] ) equal = false
		}

		return equal ? source : target
	} )

	$mol_conform_handler( Object , ( target , source )=> {

		let count = 0
		let equal = true

		for( let key in target ) {
			const conformed = $mol_conform( target[key] , source[key] )
			if( conformed !== target[key] ) {
				try { target[key] = conformed } catch( error ) {}
				if( conformed !== target[key] ) equal = false
			}
			if( conformed !== source[key] ) equal = false
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
