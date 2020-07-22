namespace $ {

	export let $mol_data_boolean = ( val : boolean )=> {
		
		if( typeof val === 'boolean' ) return val
		
		return $mol_fail( new $mol_data_error( `${ val } is not a boolean` ) )
	}
	
}
