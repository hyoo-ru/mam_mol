namespace $ {

	export function $mol_data_boolean( this: $, val : boolean ) {
		
		if( typeof val === 'boolean' ) return val
		
		return this.$mol_fail( new this.$mol_data_error( `${ val } is not a boolean` ) )
	}
	
}
