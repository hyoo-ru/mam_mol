namespace $ { 
	export function $mol_const< Value >( value : Value ) {
		var getter = <{ () : Value , '()' : Value }> ( () => value )
		getter['()'] = value
		return getter
	}
}
