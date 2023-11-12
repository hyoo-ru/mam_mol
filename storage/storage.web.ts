namespace $ {
	export class $mol_storage extends $mol_object2 {
		
		@ $mol_mem
		static native() {
			return this.$.$mol_dom_context.navigator.storage
		}
		
		@ $mol_mem
		static persisted( next?: boolean ): boolean {
			$mol_mem_persist()
			const native = this.native()
			if( next ) native.persist()
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
