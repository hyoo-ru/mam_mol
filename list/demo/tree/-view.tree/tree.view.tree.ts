namespace $ {
	export class $mol_list_demo_tree extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Large list of rows with dynamic content
		 * ```
		 */
		title() {
			return "Large list of rows with dynamic content"
		}
		
		/**
		 * ```tree
		 * sub / <= Content
		 * ```
		 */
		sub() {
			return [
				this.Content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Row* $mol_expander
		 * 	label / <= Row_title*
		 * 	expanded?val <=> row_expanded*?val
		 * 	Content <= Row_content*
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_expander()
			
			obj.label = () => [
				this.Row_title(id)
			] as readonly any[]
			obj.expanded = (val?: any) => this.row_expanded(id, val)
			obj.Content = () => this.Row_content(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_expander
		 * 	\$mol_list
		 * 	\$mol_paragraph
		 * 	\list
		 * 	\tree
		 * 	\hierarchy
		 * 	\container
		 * 	\nested
		 * ```
		 */
		tags() {
			return [
				"$mol_expander",
				"$mol_list",
				"$mol_paragraph",
				"list",
				"tree",
				"hierarchy",
				"container",
				"nested"
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
		 * root_rows /
		 * ```
		 */
		root_rows() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Content $mol_list rows <= root_rows
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.root_rows()
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_title* \
		 * ```
		 */
		row_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Row_title* $mol_paragraph sub / <= row_title*
		 * ```
		 */
		@ $mol_mem_key
		Row_title(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => [
				this.row_title(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_expanded*?val false
		 * ```
		 */
		@ $mol_mem_key
		row_expanded(id: any, val?: any) {
			if ( val !== undefined ) return val as never
			return false
		}
		
		/**
		 * ```tree
		 * row_content* /
		 * ```
		 */
		row_content(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Row_content* $mol_list rows <= row_content*
		 * ```
		 */
		@ $mol_mem_key
		Row_content(id: any) {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.row_content(id)
			
			return obj
		}
	}
	
}

