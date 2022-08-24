if( typeof window !== 'undefined' ) {
	window.addEventListener( 'hashchange' , event => $.$mol_state_history.data( null ) )
}
