namespace $ {
    
    export const $mol_wait_rest = $mol_fiber_sync(
        ()=> new Promise(
            done => new $mol_after_work( 16 ,
                ()=> done( null )
            )
        )
    )
    
}
