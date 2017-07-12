namespace $ {
	
	export function $mol_typeof( value : any ) {
		var str = {}.toString.apply( value )
		var type = str.substring( 8, str.length - 1 )
		return type
	}

}
