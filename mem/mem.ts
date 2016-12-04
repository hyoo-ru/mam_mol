namespace $ {
	
	/// Creates the decorator for caching result value by json-key passed as first argument.
	/// Method must be a polymorphic property (getter/setter/getter+setter).
	export function $mol_mem< Host , Value >(
		config? : {
			lazy? : boolean
		}
	) {
		
		return function(
			obj : Host ,
			name : string ,
			descr : TypedPropertyDescriptor< ( next? : Value , force? : $mol_atom_force )=> Value >
		) {
			var value = descr.value
			
			descr.value = function( next? : Value , force? : $mol_atom_force ) {
				var host : Host = this
				var field = name + "()"
				
				var atoms = (<any>host)[ '$mol_atom_state' ]
				if( !atoms ) atoms = (<any>host)[ '$mol_atom_state' ] = {}
				
				var info : $mol_atom<any> = atoms[ field ]
				if( !info ) {
					atoms[ field ] = info = new $mol_atom(
						value.bind( host ) as any , // FIXME: type checking
						host ,
						field ,
					)
					if( config ) info.autoFresh = !config.lazy
				}
				
				return info.value( next , force )
			}
			
			void( (<any>descr.value)[ 'value' ] = value )
		}
		
	}
	
	export function $mol_mem_key< Host , Key , Value >(
		config? : {
			lazy? : boolean
		}
	) {
		
		return function(
			obj : Host ,
			name : string ,
			descr : TypedPropertyDescriptor< ( key : Key , next? : Value , force? : $mol_atom_force )=> Value >
		) {
			const value = descr.value

			descr.value = function( key : Key , next? : Value , force? : $mol_atom_force ) {
				var host : Host = this
				var field = name + "(" + JSON.stringify( key ) + ")"
				
				var atoms = (<any>host)[ '$mol_atom_state' ]
				if( !atoms ) atoms = (<any>host)[ '$mol_atom_state' ] = {}
				
				var info : $mol_atom<any> = atoms[ field ]
				if( !info ) {
					atoms[ field ] = info = new $mol_atom(
						value.bind( host , key ) as any , // FIXME: type checking
						host ,
						field ,
					)
					if( config ) info.autoFresh = !config.lazy
				}
				
				return info.value( next , force )
			}
			
			void( (<any>descr.value)[ 'value' ] = value )
		}
		
	}

}
