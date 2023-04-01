namespace $ {
	export class $mol_float_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Floating header example
		 * ```
		 */
		title() {
			return "Floating header example"
		}
		
		/**
		 * ```tree
		 * sub / <= Scroll
		 * ```
		 */
		sub() {
			return [
				this.Scroll()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_scroll
		 * 	\$mol_filler
		 * 	\scroll
		 * 	\container
		 * ```
		 */
		tags() {
			return [
				"$mol_scroll",
				"$mol_filler",
				"scroll",
				"container"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget
		 * ```
		 */
		aspects() {
			return [
				"Widget"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Head_content $mol_paragraph title \Float header
		 * ```
		 */
		@ $mol_mem
		Head_content() {
			const obj = new this.$.$mol_paragraph()
			
			obj.title = () => "Float header"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Head_row $mol_row sub / <= Head_content
		 * ```
		 */
		@ $mol_mem
		Head_row() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Head_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Head $mol_float sub / <= Head_row
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_float()
			
			obj.sub = () => [
				this.Head_row()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Filler1 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler1() {
			const obj = new this.$.$mol_filler()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Filler2 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler2() {
			const obj = new this.$.$mol_filler()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content $mol_list rows /
		 * 	<= Filler1
		 * 	<= Filler2
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Filler1(),
				this.Filler2()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Scroll $mol_scroll sub /
		 * 	<= Head
		 * 	<= Content
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()
			
			obj.sub = () => [
				this.Head(),
				this.Content()
			] as readonly any[]
			
			return obj
		}
	}
	
}

