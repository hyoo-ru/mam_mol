namespace $ {
	export class $mol_expander extends $mol_list {
		
		/**
		 * ```tree
		 * rows /
		 * 	<= Label
		 * 	<= Content
		 * ```
		 */
		rows() {
			return [
				this.Label(),
				this.Content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * expanded? false
		 * ```
		 */
		@ $mol_mem
		expanded(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * expandable true
		 * ```
		 */
		expandable() {
			return true
		}
		
		/**
		 * ```tree
		 * label / <= title
		 * ```
		 */
		label() {
			return [
				this.title()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Trigger $mol_check_expand
		 * 	checked? <=> expanded?
		 * 	expandable <= expandable
		 * 	label <= label
		 * ```
		 */
		@ $mol_mem
		Trigger() {
			const obj = new this.$.$mol_check_expand()
			
			obj.checked = (next?: any) => this.expanded(next)
			obj.expandable = () => this.expandable()
			obj.label = () => this.label()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Tools null
		 * ```
		 */
		Tools() {
			return null as any
		}
		
		/**
		 * ```tree
		 * Label $mol_view sub /
		 * 	<= Trigger
		 * 	<= Tools
		 * ```
		 */
		@ $mol_mem
		Label() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Trigger(),
				this.Tools()
			] as readonly any[]
			
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

