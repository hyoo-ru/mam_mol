/// Creates the decorator for caching result value by json-key passed as first argument.
/// Method must be a polymorphic property (getter/setter/getter+setter).
function $mol_prop< Host extends { objectPath() : string } , Key , Value >( config? : {
	fail : ( host : Host , error : Error ) => Value|Error
} ) {
	
	return function(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< Function > // FIXME: type checking
	) {
		var value = descr.value
		if( value.length ) {
			descr.value = function( key? : Key , ...diff : Value[] ) {
				var host : Host = this
				var field = name + "(" + JSON.stringify( key ) + ")"
				
				var atoms = host[ '$mol_atom_state' ]
				if( !atoms ) atoms = host[ '$mol_atom_state' ] = {}
				
				var info : $mol_atom<any> = atoms[ field ]
				if( !info )	atoms[ field ] = info = new $mol_atom(
					host ,
					field ,
					value.bind( host , key ) ,
					config && config.fail.bind( null , host )
				)
				
				return info.value( ...diff )
			}
		} else {
			descr.value = function( ...diff : Value[] ) {
				var host : Host = this
				var field = name + "()"
				
				var atoms = host[ '$mol_atom_state' ]
				if( !atoms ) atoms = host[ '$mol_atom_state' ] = {}
				
				var info : $mol_atom<any> = atoms[ field ]
				if( !info )	atoms[ field ] = info = new $mol_atom(
					host ,
					field ,
					value.bind( host ) ,
					config && config.fail.bind( null , host )
				)
				
				return info.value( ...diff )
			}
		}
	}
	
}
