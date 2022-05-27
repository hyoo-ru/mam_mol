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
		 * tags /
		 * 	\$mol_stack
		 * 	\layout
		 * ```
		 */
		tags() {
			return [
				"$mol_stack",
				"layout"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Back $mol_image uri \https://thiscatdoesnotexist.com/
		 * ```
		 */
		@ $mol_mem
		Back() {
			const obj = new this.$.$mol_image()
			
			obj.uri = () => "https://thiscatdoesnotexist.com/"
			
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

