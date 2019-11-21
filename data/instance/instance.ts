namespace $ {

	export function $mol_data_instance< Instance extends new ( ... args : any[] )=> any >( Instance : Instance ) {

		return $mol_data_setup( ( val : InstanceType< Instance > ) => {

			if( val as object instanceof Instance ) return val
			
			return $mol_fail( new Error( `is not a ${ Instance.name }` ) )
			
		} , Instance )

	}
					
}
