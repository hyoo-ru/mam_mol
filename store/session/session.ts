namespace $ {
	export class $mol_store_session_class extends $mol_store< Record< string , any > > {
		storage(): ReturnType<typeof $mol_store_mock> {
			return this.$.$mol_dom_context.sessionStorage
		}

		@ $mol_mem
		native() {
			let native = this.$.$mol_store_safe(() => this.storage())
			if (native) return native

			native = this.$.$mol_store_mock()

			this.storage = () => native
			return native
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

	export let $mol_store_session : $mol_store< Record< string , any > > = new $mol_store_session_class

}
