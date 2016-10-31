namespace $ {
	
	export function $mol_merge_dict< Target , Source >( target : Target , source : Source ) : Target & Source {
		let result = <any> {}
		for( let key in target ) result[ key ] = ( <any> target )[ key ]
		for( let key in source ) result[ key ] = ( <any> source )[ key ]
		return result
	}
	
}
