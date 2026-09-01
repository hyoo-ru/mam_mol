namespace $ {
	export class $mol_storage extends $mol_object2 {
		
		/** Is storage a long term. */
		static persisted( next?: boolean ) {
			return false
		}
		
		/** Total storage quota in bytes. */
		static total() {
			return 0
		}
		
		/** Total storage usage in bytes. */
		static used() {
			return 0
		}
		
		/** Minimum available free space in bytes. */
		static free() {
			return this.total() - this.used()
		}
		
		/** Fulfillness of storage. */
		static portion() {
			
			const total = this.total()
			if( !total ) return 1
			
			return this.used() / total
		}
		
		/**
		 * Fulfillness logarithmic level.
		 * `0` - empty
		 * `1` - half free
		 * `2` - quart free
		 * `Infinity` - fulfilled
		 */
		static level() {
			return Math.floor( - Math.log2( 1 - this.portion() ) )
		}
		
	}
}

