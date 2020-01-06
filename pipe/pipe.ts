namespace $ {

	type Guard<
		Funcs extends $mol_type_unary[]
	> = {
		[ Index in keyof Funcs ] : (
			(
				input : $mol_type_param< Funcs[Index] , 0 >
			) => $mol_type_param<
				Index extends keyof $mol_type_tail< Funcs >
					? $mol_type_tail< Funcs >[ Index ]
					: any ,
				0
			>
		)
	}

	/**
	 * Combines list of unary functions to one.
	 * 
	 * 	const reparse = $mol_pipe( JSON.stringify , JSON.parse )
	 **/
	export function $mol_pipe<
		Funcs extends $mol_type_unary[]
	>(
		... funcs : Funcs & Guard<Funcs>
	) : (
		input : Parameters< Funcs[0] >[0]
	)=> ReturnType<
		$mol_type_foot< Funcs >
	> {

		return ( input : Funcs[0] )=> {
			let value : any = input
			for( const func of funcs as any ) value = func( value )
			return value
		}

	}

}
