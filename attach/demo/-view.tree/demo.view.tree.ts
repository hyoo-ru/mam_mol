namespace $ {
	export class $mol_attach_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title @ \Attach files an show them
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_attach_demo_title' )
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
		 * 	\attach
		 * 	\file
		 * 	\image
		 * 	\upload
		 * ```
		 */
		tags() {
			return [
				"attach",
				"file",
				"image",
				"upload"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Item1 $mol_attach_item
		 * 	url_thumb \https://thiscatdoesnotexist.com/
		 * 	url_load \https://thiscatdoesnotexist.com/
		 * ```
		 */
		@ $mol_mem
		Item1() {
			const obj = new this.$.$mol_attach_item()
			
			obj.url_thumb = () => "https://thiscatdoesnotexist.com/"
			obj.url_load = () => "https://thiscatdoesnotexist.com/"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Item2 $mol_attach_item
		 * 	url_thumb \https://thiscatdoesnotexist.com/
		 * 	url_load \https://thiscatdoesnotexist.com/
		 * ```
		 */
		@ $mol_mem
		Item2() {
			const obj = new this.$.$mol_attach_item()
			
			obj.url_thumb = () => "https://thiscatdoesnotexist.com/"
			obj.url_load = () => "https://thiscatdoesnotexist.com/"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Item3 $mol_attach_item
		 * 	url_thumb \https://thiscatdoesnotexist.com/
		 * 	url_load \https://thiscatdoesnotexist.com/
		 * ```
		 */
		@ $mol_mem
		Item3() {
			const obj = new this.$.$mol_attach_item()
			
			obj.url_thumb = () => "https://thiscatdoesnotexist.com/"
			obj.url_load = () => "https://thiscatdoesnotexist.com/"
			
			return obj
		}
		
		/**
		 * ```tree
		 * filled_items?val /
		 * 	<= Item1
		 * 	<= Item2
		 * 	<= Item3
		 * ```
		 */
		@ $mol_mem
		filled_items(val?: any) {
			if ( val !== undefined ) return val as never
			return [
				this.Item1(),
				this.Item2(),
				this.Item3()
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

