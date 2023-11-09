namespace $ {
	export class $mol_storage extends $mol_object2 {
		
		@ $mol_mem
		static native() {
			return $mol_wire_sync( this.$.$mol_dom_context.navigator.storage )
		}
		
		@ $mol_mem
		static persisted( next?: boolean ): boolean {
			$mol_mem_persist()
			const native = this.native()
			const prev = $mol_mem_cached( ()=> this.persisted() ) ?? native.persisted()
			if( next && !prev ) native.persist()
			return next ?? prev
		}
		
		static estimate() {
			return this.native().estimate()
		}
		
		static dir() {
			return this.native().getDirectory()
		}
		
	}
}
