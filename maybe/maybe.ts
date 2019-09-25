namespace $ {
	
	export function $mol_maybe< Value >( value : Value | null | undefined ) : Value[] {
		return ( value == null ) ? [] : [ value ]
	}
	
}
