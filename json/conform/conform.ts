namespace $ {

	export function $mol_json_conform< Target , Source >( target : Target , source : Source , stack : any[] = [] ) : Target {

		const t = target as any
		const s = source as any

		if( t === s ) return s

		if( !t || typeof t !== 'object' ) return t
		if( !s || typeof s !== 'object' ) return t
		
		if( t.constructor === Array ) {

			if( s.constructor !== Array ) return t
			
			if( stack.indexOf( t ) >= 0 ) return t
			stack = [ ... stack , t ]

			let equal = t.length === s.length

			for( let i = 0 ; i < t.length ; ++i ) {
				const conformed = t[i] = $mol_json_conform( t[i] , s[i] , stack )
				if( equal && conformed !== s[i] ) equal = false
			}

			return equal ? s : t
		}

		if( t.constructor === Object ) {

			if( s.constructor !== Object ) return t

			if( stack.indexOf( t ) >= 0 ) return t
			stack = [ ... stack , t ]

			const tkeys = Object.keys( t )
			const skeys = Object.keys( s )

			let equal = tkeys.length === skeys.length

			for( let key of tkeys ) {
				const conformed = t[key] = $mol_json_conform( t[key] , s[key] , stack )
				if( equal && conformed !== s[key] ) equal = false
			}

			return equal ? s : t
		}

		return t
	}

}
