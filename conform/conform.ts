namespace $ {

	export function $mol_conform< Target , Source >( target : Target , source : Source , stack? : Set<any> ) : Target {

		if( target as any === source as any ) return source as any

		if( !target || typeof target !== 'object' ) return target
		if( !source || typeof source !== 'object' ) return target
		
		if( target.constructor !== source.constructor ) return target

		const conform = $mol_conform_handlers.get( target.constructor )
		if( !conform ) return target

		if( stack ) {
			if( stack.has( target ) ) return target
		} else {
			stack = new Set
		}

		stack.add( target )

		const res = conform( target , source , stack )

		stack.delete( target )

		return res
	}

	export const $mol_conform_handlers = new WeakMap< Object , ( target : any , source : any , stack? : Set<any> )=> any >()

	export function $mol_conform_handler< Class >(
		cl : { new( ... args : any[] ) : Class } ,
		handler : ( target : Class , source : Class , stack : Set<any> )=> Class ,
	) {
		$mol_conform_handlers.set( cl , handler )
	}

	$mol_conform_handler( Array , ( target , source , stack )=> {
		
		let equal = target.length === source.length

		for( let i = 0 ; i < target.length ; ++i ) {
			const conformed = target[i] = $mol_conform( target[i] , source[i] , stack )
			if( equal && conformed !== source[i] ) equal = false
		}

		return equal ? source : target
	} )

	$mol_conform_handler( Object , ( target , source , stack )=> {

		let count = 0
		let equal = true

		for( let key in target ) {
			const conformed = target[key] = $mol_conform( target[key] , source[key] , stack )
			if( equal && conformed !== source[key] ) equal = false
			++ count
		}

		for( let key in source ) if( -- count < 0 ) break

		return ( equal && count === 0 ) ? source : target
	} )

	$mol_conform_handler( Date , ( target , source )=> ( target.getTime() === source.getTime() ) ? source : target )

	$mol_conform_handler( RegExp , ( target , source )=> ( target.toString() === source.toString() ) ? source : target )

}
