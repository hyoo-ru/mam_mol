function $mol_const< Value >( value : Value ) {
	var getter = () => value
	getter[ '()' ] = value
	return getter
}
