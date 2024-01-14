namespace $ {

	type Guard_value<
		Funcs extends $mol_type_unary[] ,
		Index extends keyof Funcs
	> = $mol_type_param<
		Index extends keyof $mol_type_tail< Funcs >
			? $mol_type_tail< Funcs >[ Index ]
			: any ,
		0
	>

	type Guard<
		Funcs extends $mol_type_unary[]
	> = {
		[ Index in keyof Funcs ] : (
			Funcs[Index] extends $mol_type_unary_func
				? (
					input : $mol_type_param< Funcs[Index] , 0 >
				) => Guard_value< Funcs , Index >
				: new(
					input : $mol_type_param< Funcs[Index] , 0 >
				) => Guard_value< Funcs , Index >
		)
	}

	/**
	 * Combines list of unary functions/classes to one function.
	 * 
	 * 	const reparse = $mol_data_pipe( JSON.stringify , JSON.parse )
	 **/
	export function $mol_data_pipe<
		Funcs extends $mol_type_unary[]
	>(
		... funcs : Funcs & Guard< Funcs >
	) {

		return $mol_data_setup(
			function( this: any, input :  $mol_type_param< Funcs[0] , 0 > ) {
				let value : any = input
				for( const func of funcs ) value = $mol_func_is_class( func ) ? new func( value ) : ( func as any ).call( this, value )
				return value as $mol_type_result<
					$mol_type_foot< Funcs >
				>
			},
			{ funcs }
		)

	}

}
