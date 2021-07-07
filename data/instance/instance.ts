namespace $ {

	export function $mol_data_instance< Instance extends new ( ... args : any[] )=> any >( Instance : Instance ) {

		return $mol_data_setup( function( this: $, val : InstanceType< Instance > ) {

			if(!( val as object instanceof Instance ))
				return this.$mol_fail( new this.$mol_data_error( `${ val } is not a ${ Instance.name }` ) )
				
			return val
			
		} , Instance )

	}
					
}
