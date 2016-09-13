function $mol_const< Value >( value : Value ) {
	var getter = () => value
	void( ( <any> getter )[ '()' ] = value )
	return getter
}
