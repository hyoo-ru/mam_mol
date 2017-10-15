namespace $ {

	export function $mol_conform< Target , Source >( target : Target , source : Source , stack : any[] = [] ) : Target {

		const t = target as any
		const s = source as any

		if( t === s ) return s

		if( !t || typeof t !== 'object' ) return t
		if( !s || typeof s !== 'object' ) return t
		
		if( t.constructor !== s.constructor ) return t

		const conform = $mol_conform_types.get( t.constructor )
		if( !conform ) return t

		if( stack.indexOf( t ) >= 0 ) return t

		return conform( t , s , [ ... stack , t ] )
	}

	export const $mol_conform_types = new WeakMap< Object , ( target : any , source : any , stack? : any[] )=> any >()

	$mol_conform_types.set( Array , ( target : any[] , source : any[] , stack : any[] )=> {
		
		let equal = target.length === source.length

		for( let i = 0 ; i < target.length ; ++i ) {
			const conformed = target[i] = $mol_conform( target[i] , source[i] , stack )
			if( equal && conformed !== source[i] ) equal = false
		}

		return equal ? source : target
	} )

	$mol_conform_types.set( Object , ( target : Object , source : Object , stack : any[] )=> {

		const tkeys = Object.keys( target )
		const skeys = Object.keys( source )

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

	$mol_conform_types.set( Date , ( target : Date , source : Date , stack : any[] )=> {
		return ( target.getTime() === source.getTime() ) ? source : target
	} )

	$mol_conform_types.set( RegExp , ( target : RegExp , source : RegExp , stack : any[] )=> {
		return ( target.toString() === source.toString() ) ? source : target
	} )

}
