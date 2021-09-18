namespace $ {
	export class $mol_gallery extends $mol_view {
		
		/**
		 * ```tree
		 * sub <= items
		 * ```
		 */
		sub() {
			return this.items()
		}
		
		/**
		 * ```tree
		 * Side!id $mol_gallery
		 * 	style * flexGrow <= side_size!id
		 * 	items <= side_items!id
		 * ```
		 */
		@ $mol_mem_key
		Side(id: any) {
			const obj = new this.$.$mol_gallery()
			
			obj.style = () => ({
				flexGrow: this.side_size(id)
			})
			obj.items = () => this.side_items(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * items /$mol_view
		 * ```
		 */
		items() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * side_size!id \1
		 * ```
		 */
		side_size(id: any) {
			return "1"
		}
		
		/**
		 * ```tree
		 * side_items!id /$mol_view
		 * ```
		 */
		side_items(id: any) {
			return [
			] as readonly $mol_view[]
		}
	}
	
}

