namespace $ {

	$mol_ambient({}).$mol_log3_warn({
		place: '$mol_merge_dict',
		message: 'Deprecated',
		hint: 'Use spread operator',
	})
	
	export function $mol_merge_dict< Target , Source >( target : Target , source : Source ) : Target & Source {
		let result = {} as any
		for( let key in target ) result[ key ] = ( target as any )[ key ]
		for( let key in source ) result[ key ] = ( source as any )[ key ]
		return result
	}
	
}
