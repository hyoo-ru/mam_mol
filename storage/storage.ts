namespace $ {
	export class $mol_storage extends $mol_object2 {
		
		@ $mol_mem
		static native() {
			return this.$.$mol_dom_context.navigator.storage ?? { // exists only in secure context
				persisted: async ()=> false,
				persist: async ()=> false,
				estimate: async ()=> ({}),
				getDirectory: async ()=> null! as FileSystemHandle,
			} as StorageManager
		}
		
		@ $mol_mem
		static persisted( next?: boolean, cache?: 'cache' ): boolean {
			
			$mol_mem_persist()
			
			if( cache ) return Boolean( next )
			
			const native = this.native()
			if( next && !$mol_mem_cached( ()=> this.persisted() ) ) {
				native.persist().then( actual => {
					
					setTimeout( ()=> this.persisted( actual, 'cache' ), 5000 )
					
					if( actual ) this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` })
					else this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` })
					
				} )
			}
			
			return next ?? $mol_wire_sync( native ).persisted()
		}
		
		static estimate() {
			return $mol_wire_sync( this.native() ?? {} ).estimate()
		}
		
		static dir() {
			return $mol_wire_sync( this.native() ).getDirectory()
		}
		
	}
}
