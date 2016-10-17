module $ {
	
	/// Creates the decorator for caching result value by json-key passed as first argument.
	/// Method must be a polymorphic property (getter/setter/getter+setter).
	export function $mol_prop< Host extends { objectPath() : string } , Key , Value >(
		config? : {
			fail? : ( host : Host , error : Error ) => Value|Error
			lazy? : boolean
		}
	) {
		
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
					
					var atoms = (<any>host)[ '$mol_atom_state' ]
					if( !atoms ) atoms = (<any>host)[ '$mol_atom_state' ] = {}
					
					var info : $mol_atom<any> = atoms[ field ]
					if( !info ) {
						atoms[ field ] = info = new $mol_atom(
							value as any , // FIXME: type checking
							config && config.fail ,
							host ,
							field ,
							key ,
						)
						if( config ) info.autoFresh = !config.lazy
					}
					
					return info.value( ...diff )
				}
			} else {
				descr.value = function( ...diff : Value[] ) {
					var host : Host = this
					var field = name + "()"
					
					var atoms = (<any>host)[ '$mol_atom_state' ]
					if( !atoms ) atoms = (<any>host)[ '$mol_atom_state' ] = {}
					
					var info : $mol_atom<any> = atoms[ field ]
					if( !info ) {
						atoms[ field ] = info = new $mol_atom(
							value as any , // FIXME: type checking
							config && config.fail ,
							host ,
							field ,
						)
						if( config ) info.autoFresh = !config.lazy
					}
					
					return info.value( ...diff )
				}
			}
			
			void( (<any>descr.value)[ 'value' ] = value )
		}
		
	}
	
}
