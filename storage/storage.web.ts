namespace $ {
	export class $mol_storage extends $mol_object2 {
		
		@ $mol_mem
		static native() {
			return this.$.$mol_dom_context.navigator.storage
		}
		
		@ $mol_mem
		static persisted( next?: boolean, cache?: 'cache' ): boolean {
			
			$mol_mem_persist()
			
			if( cache ) return Boolean( next )
			
			const native = this.native()
			if( next ) native.persist().then( actual => this.persisted( actual, 'cache' ) )
			
			return next ?? $mol_wire_sync( native ).persisted()
		}
		
		static estimate() {
			return $mol_wire_sync( this.native() ).estimate()
		}
		
		static dir() {
			return $mol_wire_sync( this.native() ).getDirectory()
		}
		
	}
}
