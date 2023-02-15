namespace $ {
	export class $mol_form_field extends $mol_labeler {
		
		/**
		 * ```tree
		 * bids /string
		 * ```
		 */
		bids() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * label /
		 * 	<= name
		 * 	<= Bid
		 * ```
		 */
		label() {
			return [
				this.name(),
				this.Bid()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * content / <= control
		 * ```
		 */
		content() {
			return [
				this.control()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * name \
		 * ```
		 */
		name() {
			return ""
		}
		
		/**
		 * ```tree
		 * bid \
		 * ```
		 */
		bid() {
			return ""
		}
		
		/**
		 * ```tree
		 * Bid $mol_view sub / <= bid
		 * ```
		 */
		@ $mol_mem
		Bid() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.bid()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * control null
		 * ```
		 */
		control() {
			return null as any
		}
	}
	
}

