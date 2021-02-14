namespace $ {
    
    export const $mol_wait_timeout = $mol_fiber_sync(
        ( timeout: number )=> new Promise(
            done => new $mol_after_timeout( timeout ,
                ()=> done( null )
            )
        )
    )
    
}
