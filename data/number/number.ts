namespace $ {

	export let $mol_data_number = ( val : number )=> {
		
		if( typeof val === 'number' ) return val
		
		return $mol_fail( new $mol_data_error( `${ val } is not a number` ) )
		
	}
	
}
