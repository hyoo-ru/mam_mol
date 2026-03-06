namespace $ {
	export class $mol_store_native extends $mol_store< Record< string , any > > {
		protected _native = null as null | ReturnType<typeof $mol_store_mock>

		native() {
			return this._native = this._native ?? this.$.$mol_store_mock()
		}

		override data() {
			return $mol_fail( new Error( 'Forbidden for storage' ) )
		}

		@ $mol_mem_key
		override value< Value >( key : string , next? : Value , force? : 'local' | $mol_mem_force_cache) {
			
			if( next === undefined ) return JSON.parse( this.native().getItem( key ) || 'null' )
			
			if( next === null ) this.native().removeItem( key ) 
			else this.native().setItem( key , JSON.stringify( next ) )

			return next
		}
	}

}
