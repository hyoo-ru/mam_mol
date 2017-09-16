namespace $ {
	
	export class $mol_state_local< Value > extends $mol_object {
		
		static 'native()' : Pick< Storage , 'getItem'|'setItem'|'removeItem' >
		static native() {
			if( this['native()'] ) return this['native()']

			check : try {
				const native = $mol_dom_context.localStorage
				if( !native ) break check
				
				native.setItem( '' , '' )
				native.removeItem( '' )
				return this['native()'] = native
			} catch( error ) {
				console.warn( error )
			}

			return this['native()'] = {
				getItem( key : string ) {
					return this[ ':' + key ]
				} ,
				setItem( key : string , value : string ) {
					this[ ':' + key ] = value
				} ,
				removeItem( key : string ) {
					this[ ':' + key ] = void 0
				}
			}

		}

		@ $mol_mem_key
		static value< Value >( key : string , next? : Value , force? : $mol_atom_force ) : Value {
			if( next === void 0 ) return JSON.parse( this.native().getItem( key ) || 'null' )
			
			if( next === null ) this.native().removeItem( key )
			else this.native().setItem( key , JSON.stringify( next ) )
			
			return next
		}
		
		prefix() { return '' }
		
		value( key : string , next? : Value ) {
			return $mol_state_local.value( this.prefix() + '.' + key , next )
		}
		
	}
	
}
