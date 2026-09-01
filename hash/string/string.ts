namespace $ {

	/**
	 * 48-bit streamable string hash function
	 * Based on cyrb53: https://stackoverflow.com/a/52171480
	 */
	export function $mol_hash_string( str: string, seed = 0 ) {
		let nums = new Array( str.length )
		for( let i = 0; i < str.length; ++i ) nums[i] = str.charCodeAt(i)
		return $mol_hash_numbers( nums )
	}

}
