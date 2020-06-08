namespace $ {

	export let $mol_data_string = ( val : string )=> {
		
		if( typeof val === 'string' ) return val
		
		return $mol_fail( new $mol_data_error( `${ typeof val } is not a string` ) )
	}
	
}
