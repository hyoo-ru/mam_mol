namespace $ {
	export class $mol_stack_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * sub / <= Collage
		 * ```
		 */
		sub() {
			return [
				this.Collage()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Layout
		 * ```
		 */
		aspects() {
			return [
				"Widget/Layout"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Back $mol_image uri \https://cataas.com/cat
		 * ```
		 */
		@ $mol_mem
		Back() {
			const obj = new this.$.$mol_image()
			
			obj.uri = () => "https://cataas.com/cat"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Front $mol_view sub / \❤🧡💛💚💙💜🤎🖤
		 * ```
		 */
		@ $mol_mem
		Front() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				"❤🧡💛💚💙💜🤎🖤"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Collage $mol_stack sub /
		 * 	<= Back
		 * 	<= Front
		 * ```
		 */
		@ $mol_mem
		Collage() {
			const obj = new this.$.$mol_stack()
			
			obj.sub = () => [
				this.Back(),
				this.Front()
			] as readonly any[]
			
			return obj
		}
	}
	
}

