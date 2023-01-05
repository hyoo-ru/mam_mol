namespace $ {
	export function $mol_wire_let< Host extends {} >( host: Host ) {
		for( const field of Object.keys( host ) ) {
			host[ field ] = new $mol_wire_atom( field, host[ field ], host ).channel()
		}
		return host as Host & {
			[ Field in keyof Host ]: {
				atom: $mol_wire_atom<
					Host,
					Parameters< Extract< Host[ Field ], ( ... args: any[] )=>any > >,
					$mol_type_result< Host[ Field ] >
				>
			}
		}
	}
}
