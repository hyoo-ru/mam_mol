namespace $ {

	export function $mol_tree2_bin_to_bytes( tree : $mol_tree2 ) {
		return Uint8Array.from( tree.kids , kid => parseInt( kid.value , 16 ) )
	}

	export function $mol_tree2_bin_from_bytes(
		bytes : ArrayLike< number >,
		span  = $mol_span.unknown,
	) {
		
		return $mol_tree2.list( Array.from( bytes , code => {
			return $mol_tree2.data( code.toString( 16 ).padStart( 2 , '0' ) , [] , span )
		} ) , span )
		
	}

	export function $mol_tree2_bin_from_string(
		str : string,
		span = $mol_span.unknown,
	) {
		return $mol_tree2_bin_from_bytes( [ ... new TextEncoder().encode( str ) ] , span )
	}

}
