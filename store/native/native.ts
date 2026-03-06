namespace $ {
	export class $mol_store_native extends $mol_store< Record< string , any > > {
		constructor(
			readonly id : string
		) {
			super({})
		}

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

		protected _fallback = null as null | $mol_store_mem_class
		fallback() {
			return this._fallback = this._fallback ?? new this.$.$mol_store_mem_class(this.id)
		}

		@ $mol_mem_key
		override value< Value >( key : string , next? : Value , force? : 'local' | $mol_mem_force_cache) {
			const native = this.native()
			if (! native) {
				return this.fallback().value(key, next)
			}

			if( next === undefined ) return JSON.parse( native.getItem( key ) || 'null' )
			
			if( next === null ) native.removeItem( key ) 
			else native.setItem( key , JSON.stringify( next ) )

			return next
		}
	}

}
