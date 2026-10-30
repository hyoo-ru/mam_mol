namespace $ {
	export class $mol_storage_web extends $mol_storage {
		
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
				this.$.$mol_wait_user_async()
				.then( ()=> native.persist() )
				.then( actual => {
					
					setTimeout( ()=> this.persisted( actual, 'cache' ), 5000 )
					
					if( actual ) this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` })
					else this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` })
					
				} )
			}
			
			return next ?? $mol_wire_sync( native ).persisted()
		}
		
		@ $mol_mem
		static estimate( next?: null ) {
			try {
				const estimate = $mol_wire_sync( this.native() ?? {} ).estimate()
				new this.$.$mol_after_timeout( 1000, $mol_wire_async( ()=> this.estimate( null ) ) )
				return estimate
			} catch( error ) {
				if( !$mol_promise_like( error ) ) new this.$.$mol_after_timeout( 1000, $mol_wire_async( ()=> this.estimate( null ) ) )
				$mol_fail_hidden( error )
			}
		}
		
		static override total() {
			return this.estimate().quota ?? 0
		}
		
		static override used() {
			return this.estimate().usage ?? 0
		}
		
		static override free() {
			const { usage = 0, quota = 0 } = this.estimate()
			return quota - usage
		}
		
		static override portion() {
			
			const { usage = 0, quota = 0 } = this.estimate()
			if( !quota ) return 1
			
			return usage / quota
		}
		
		static dir() {
			return $mol_wire_sync( this.native() ).getDirectory()
		}
		
	}
	$.$mol_storage = $.$mol_storage_web
}
