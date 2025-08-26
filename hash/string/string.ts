namespace $ {

	/**
	 * 48-bit streamable string hash function
	 * Based on cyrb53: https://stackoverflow.com/a/52171480
	 */
	export function $mol_hash_string( str: string, seed = 0 ) {
		return $mol_hash_numbers( [ ... str ].map( ch => ch.codePointAt(0)! ) )
	}

}
