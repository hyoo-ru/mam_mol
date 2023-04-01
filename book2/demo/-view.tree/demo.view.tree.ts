namespace $ {
	export class $mol_book2_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Adaprive layout for various sizes of screen
		 * ```
		 */
		title() {
			return "Adaprive layout for various sizes of screen"
		}
		
		/**
		 * ```tree
		 * sub / <= View
		 * ```
		 */
		sub() {
			return [
				this.View()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\app
		 * 	\page
		 * 	\book
		 * 	\navigation
		 * 	\transition
		 * 	\multipage
		 * 	\dialog
		 * 	\breadcrumbs
		 * 	\drawer
		 * ```
		 */
		tags() {
			return [
				"app",
				"page",
				"book",
				"navigation",
				"transition",
				"multipage",
				"dialog",
				"breadcrumbs",
				"drawer"
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
		 * Side $mol_view sub / \Side
		 * ```
		 */
		@ $mol_mem
		Side() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				"Side"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * First $mol_view sub / \First
		 * ```
		 */
		@ $mol_mem
		First() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				"First"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Second $mol_view sub / \Second
		 * ```
		 */
		@ $mol_mem
		Second() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				"Second"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Third $mol_view sub / \Third
		 * ```
		 */
		@ $mol_mem
		Third() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				"Third"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * View $mol_book2
		 * 	Placeholder <= Side
		 * 	pages /
		 * 		<= First
		 * 		<= Second
		 * 		<= Third
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_book2()
			
			obj.Placeholder = () => this.Side()
			obj.pages = () => [
				this.First(),
				this.Second(),
				this.Third()
			] as readonly any[]
			
			return obj
		}
	}
	
}

