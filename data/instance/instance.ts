namespace $ {

	/**
	 * Checks for instance of given class and returns narrowed type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_instance_demo
	 */
	export function $mol_data_instance< Instance extends new ( ... args : any[] )=> any >( Instance : Instance ) {

		return $mol_data_setup( ( val : InstanceType< Instance > ) => {

			if( val as object instanceof Instance ) return val
			
			return $mol_fail( new $mol_data_error( `${ val } is not a ${ Instance.name }` ) )
			
		} , Instance )

	}
					
}
