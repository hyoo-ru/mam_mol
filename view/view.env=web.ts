/// ViewModel
class $mol_view extends $mol_object {
	
	@ $mol_atom()
	static root( id : number ) {
		var name = document.querySelectorAll( '[mol_view_root]' )[ id ].getAttribute( 'mol_view_root' )
		return new window['$'][ name ]
	}
	
	/// Child views
	@ $mol_atom()
	childs( id : number ) {
		return <Array<$mol_view|Element|string|number|boolean>>[]
	}
}

/// Automatic attach view roots to loaded DOM.
document.addEventListener( 'DOMContentLoaded' , event => {
	var nodes = document.querySelectorAll( '[mol_view_root]' )
	for( var i = nodes.length - 1 ; i >= 0 ; --i ) $mol_view.root( i )
} )
