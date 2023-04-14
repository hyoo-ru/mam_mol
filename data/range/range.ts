namespace $ {

	/**
	 * Checks for include inside given range of values and returns expected type.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_range_demo
	 */
	export function $mol_data_range< Value >( from: Value, to: Value ) {

		return $mol_data_setup( ( val: Value ) => {

			if( val > from && val < to ) return val
			return $mol_fail( new $mol_data_error( `${ val } is out range (${ from },${to})` ) )

		} , [ from, to ] )

	}
					
}
