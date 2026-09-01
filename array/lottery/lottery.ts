namespace $ {
	
	export function $mol_array_lottery< Value >( list : readonly Value[] ) {
		return list[ Math.floor( Math.random() * list.length ) ]
	}
	
}
