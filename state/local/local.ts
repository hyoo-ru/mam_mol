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
			} catch( error: any ) {
				console.warn( error )
			}

			return this['native()'] = {
				getItem( key : string ) {
					return (this as any)[ ':' + key ]
				} ,
				setItem( key : string , value : string ) {
					(this as any)[ ':' + key ] = value
				} ,
				removeItem( key : string ) {
					(this as any)[ ':' + key ] = void 0
				}
			}

		}
		
		@ $mol_mem
		static changes( next?: StorageEvent ) { return next }

		@ $mol_mem_key
		static value< Value >(
			key : string ,
			next? : Value | null ,
		) : Value | null {
			
			this.changes()
			
			if( next === void 0 ) return JSON.parse( this.native().getItem( key ) || 'null' )
			
			if( next === null ) {
				this.native().removeItem( key )
			} else {
				this.native().setItem( key , JSON.stringify( next ) )
				this.$.$mol_storage.persisted( true )
			}
			
			return next
		}
		
		prefix() { return '' }
		
		value( key : string , next? : Value ) {
			return $mol_state_local.value( this.prefix() + '.' + key , next )
		}
		
	}
	
}
