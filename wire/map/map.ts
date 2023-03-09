namespace $ {
    
    export function $mol_wire_map< Next, Res >( ... ways: (( next?: Next )=> Res )[] ) {
        return ( next?: Next )=> {
            let res!
            for( const way of ways ) res ??= way( next )
            return res ?? next
        }
    }

}