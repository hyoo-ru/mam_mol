namespace $ {
	export class $mol_section extends $mol_list {
		
		/**
		 * ```tree
		 * rows /
		 * 	<= Head
		 * 	<= Content
		 * ```
		 */
		rows() {
			return [
				this.Head(),
				this.Content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * head / <= title
		 * ```
		 */
		head() {
			return [
				this.title()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Head $mol_view sub <= head
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => this.head()
			
			return obj
		}
		
		/**
		 * ```tree
		 * content /
		 * ```
		 */
		content() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Content $mol_list rows <= content
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.content()
			
			return obj
		}
	}
	
}

