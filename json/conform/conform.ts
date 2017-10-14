namespace $ {

	export function $mol_json_conform< Target , Source >( target : Target , source : Source ) : Target & Source {

		const t = target as any
		const s = source as any

		if( t === s ) return s

		if( !t || typeof t !== 'object' ) return t
		if( !s || typeof s !== 'object' ) return t
		
		if( t.constructor !== s.constructor ) return t
		if( t.constructor !== Object && t.constructor !== Array ) return t

		const tkeys = Object.keys( t )
		const skeys = Object.keys( s )

		let equal = tkeys.length === skeys.length

		for( let key of tkeys ) {
			const conformed = $mol_json_conform( t[key] , s[key] )
			if( conformed !== s[key] ) equal = false
			if( conformed !== t[key] ) t[key] = conformed
		}

		return equal ? s : t
	}

}
