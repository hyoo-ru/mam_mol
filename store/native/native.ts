namespace $ {
	export class $mol_store_native extends $mol_store< Record< string , any > > {
		native() {
			return null as null | {
				getItem : ( key : string ) => string | null
				setItem : ( key : string , value : string )=> void
				removeItem : ( key : string )=> void
			}
		}

		override data() {
			return $mol_fail( new Error( 'Forbidden for storage' ) )
		}

		@ $mol_mem_key
		override value< Value >( key : string , next? : Value , force? : 'local' | $mol_mem_force_cache) {
			const native = this.native()
			if (! native) {
				return this.$.$mol_store_mem.value(key, next)
			}

			if( next === undefined ) return JSON.parse( native.getItem( key ) || 'null' )
			
			if( next === null ) native.removeItem( key ) 
			else native.setItem( key , JSON.stringify( next ) )

			return next
		}
	}

}
