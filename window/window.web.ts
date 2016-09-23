class $mol_window extends $mol_object {
	
	@ $mol_prop()
	static size( ...diff : number[][] ) {
		return [ window.innerWidth , window.innerHeight ]
	}
	
}

window.addEventListener( 'resize' , ()=> {
	$mol_window.size( void 0 )
} )
