namespace $ { 
	/**
	 * Returns closure that returns constant value. Value can be accessed by `"()"` field.
	 * @example
	 * const foo = { bar : $mol_const( Math.random() ) }
	 * $mol_assert_equal( foo.bar() , foo.bar() )
	 * $mol_assert_equal( foo.bar() , foo.bar['()'] )
	 */
	export function $mol_const< Value >( value : Value ) {
		var getter = <{ () : Value , '()' : Value }> ( () => value )
		getter['()'] = value
		getter[ Symbol.toStringTag ] = value
		return getter
	}
}
