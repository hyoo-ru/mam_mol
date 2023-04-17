namespace $ {
	export class $mol_attach_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Attach files an show them
		 * ```
		 */
		title() {
			return "Attach files an show them"
		}
		
		/**
		 * ```tree
		 * sub / <= Filled
		 * ```
		 */
		sub() {
			return [
				this.Filled()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\file
		 * 	\image
		 * 	\upload
		 * ```
		 */
		tags() {
			return [
				"file",
				"image",
				"upload"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Control
		 * 	\Type/File
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control",
				"Type/File"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * filled_items?val / \https://picsum.photos/200
		 * ```
		 */
		@ $mol_mem
		filled_items(val?: any) {
			if ( val !== undefined ) return val as never
			return [
				"https://picsum.photos/200"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Filled $mol_attach items?val <=> filled_items?val
		 * ```
		 */
		@ $mol_mem
		Filled() {
			const obj = new this.$.$mol_attach()
			
			obj.items = (val?: any) => this.filled_items(val)
			
			return obj
		}
	}
	
}

