namespace $ {
	
	export function $mol_maybe< Value >( value : Value ) {
		return ( value == null ) ? [] : [ value ]
	}
	
}
