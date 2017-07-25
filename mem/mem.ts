namespace $ {
	
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
			const value = descr.value
			
			descr.value = function( next? : Value , force? : $mol_atom_force ) {
				const host : any = this
				const field = name + "()"
				const fieldA = field + '@'
				
				let atom : $mol_atom<Value> = host[ fieldA ]
				if( !atom ) {
					if( force && ( next === undefined ) ) return next
					
					host[ fieldA ] = atom = new $mol_atom<Value>(
						host ,
						value.bind( host ) as any , // FIXME: type checking
						field ,
					)
					if( config ) atom.autoFresh = !config.lazy
				}
				
				return atom.value( next , force )
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
				const host : any = this
				const field = name + "(" + JSON.stringify( key ) + ")"
				const fieldA = field + '@'
				
				let atom : $mol_atom<Value> = host[ fieldA ]
				if( !atom ) {
					if( force && ( next === undefined ) ) return next
					
					host[ fieldA ] = atom = new $mol_atom<Value>(
						host ,
						value.bind( host , key ) as any , // FIXME: type checking
						field ,
					)
					if( config ) atom.autoFresh = !config.lazy
				}
				
				return atom.value( next , force )
			}
			
			void( (<any>descr.value)[ 'value' ] = value )
		}
		
	}

}
