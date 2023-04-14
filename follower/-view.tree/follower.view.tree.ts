namespace $ {
	export class $mol_follower extends $mol_ghost {
		
		/**
		 * ```tree
		 * Anchor $mol_view
		 * ```
		 */
		@ $mol_mem
		Anchor() {
			const obj = new this.$.$mol_view()
			
			return obj
		}
		
		/**
		 * ```tree
		 * offset /
		 * 	0
		 * 	0
		 * ```
		 */
		offset() {
			return [
				0,
				0
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	transform <= transform
		 * ```
		 */
		style() {
			return {
				...super.style(),
				transform: this.transform()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * transform \
		 * ```
		 */
		transform() {
			return ""
		}
	}
	
}

