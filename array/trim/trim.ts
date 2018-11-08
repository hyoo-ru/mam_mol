namespace $ {

	export function $mol_array_trim< Item >( array : Item[] ) {

		let last = array.length
		while( last > 0 ) {
			
			-- last
			const value = array[ last ]
			
			if( value === undefined ) array.pop()
			else break
		}

		return array
	}

}
