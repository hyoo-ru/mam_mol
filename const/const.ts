namespace $ { 
	/**
	 * Returns closure that returns constant value.
	 * @example
	 * const rnd = $mol_const( Math.random() )
	 */
	export function $mol_const< Value >( value : Value ) {
		var getter = <{ () : Value , '()' : Value }> ( () => value )
		getter['()'] = value
		getter[ Symbol.toStringTag ] = value
		return getter
	}
}
