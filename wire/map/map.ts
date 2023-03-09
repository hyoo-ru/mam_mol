namespace $ {
    
    export function $mol_wire_map< Val >(
		... ways: (( next?: Val )=> Val )[]
	) {
        return ( next?: Val )=> {
            let res: Val | undefined
            for( const way of ways ) res ??= way( next )
            return res ?? next
        }
    }

}