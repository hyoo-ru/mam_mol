window.addEventListener( 'storage' , event => $.$mol_state_local.value( event.key , void 0 , JSON.parse( localStorage.getItem( event.key ) || 'null' ) ) )
