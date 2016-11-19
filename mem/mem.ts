namespace $ {
	
	/// Creates the decorator for caching result value by json-key passed as first argument.
	/// Method must be a polymorphic property (getter/setter/getter+setter).
	export function $mol_mem< Host extends { objectPath() : string } , Value , Descr >(
		config? : {
			lazy? : boolean
		}
	) {
		
		return function(
			obj : Host ,
			name : string ,
			descr : TypedPropertyDescriptor< ( next? : Value , prev? : Value )=> Value >
		) {
			var value = descr.value
			
			descr.value = function( next? : Value , prev? : Value ) {
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
				
				return info.value( next , prev )
			}
			
			void( (<any>descr.value)[ 'value' ] = value )
		}
		
	}
	
	export function $mol_mem_key< Host extends { objectPath() : string } , Key , Value >(
		config? : {
			lazy? : boolean
		}
	) {
		
		return function(
			obj : Host ,
			name : string ,
			descr : TypedPropertyDescriptor< ( key : Key , next? : Value , prev? : Value )=> Value >
		) {
			const value = descr.value

			descr.value = function( key : Key , next? : Value , prev? : Value ) {
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
				
				return info.value( next , prev )
			}
			
			void( (<any>descr.value)[ 'value' ] = value )
		}
		
	}

}
