namespace $ {
	export class $mol_dump_value extends $mol_view {
		
		/**
		 * ```tree
		 * value null
		 * ```
		 */
		value() {
			return null as any
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Simple
		 * 	<= Expand
		 * ```
		 */
		sub() {
			return [
				this.Simple(),
				this.Expand()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * simple \
		 * ```
		 */
		simple() {
			return ""
		}
		
		/**
		 * ```tree
		 * Simple $mol_text_code text <= simple
		 * ```
		 */
		@ $mol_mem
		Simple() {
			const obj = new this.$.$mol_text_code()
			
			obj.text = () => this.simple()
			
			return obj
		}
		
		/**
		 * ```tree
		 * expanded?val false
		 * ```
		 */
		@ $mol_mem
		expanded(val?: any) {
			if ( val !== undefined ) return val as never
			return false
		}
		
		/**
		 * ```tree
		 * expand_title \
		 * ```
		 */
		expand_title() {
			return ""
		}
		
		/**
		 * ```tree
		 * Expand_title $mol_text_code text <= expand_title
		 * ```
		 */
		@ $mol_mem
		Expand_title() {
			const obj = new this.$.$mol_text_code()
			
			obj.text = () => this.expand_title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Expand_head $mol_check_expand
		 * 	minimal_height 24
		 * 	minimal_width 24
		 * 	checked?val <=> expanded?val
		 * 	label / <= Expand_title
		 * ```
		 */
		@ $mol_mem
		Expand_head() {
			const obj = new this.$.$mol_check_expand()
			
			obj.minimal_height = () => 24
			obj.minimal_width = () => 24
			obj.checked = (val?: any) => this.expanded(val)
			obj.label = () => [
				this.Expand_title()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_values* /
		 * ```
		 */
		row_values(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Row*0 $mol_dump_list values <= row_values*
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_dump_list()
			
			obj.values = () => this.row_values(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * expand_content / <= Row*0
		 * ```
		 */
		expand_content() {
			return [
				this.Row("0")
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Expand $mol_expander
		 * 	expanded?val <=> expanded?val
		 * 	Trigger <= Expand_head
		 * 	content <= expand_content
		 * ```
		 */
		@ $mol_mem
		Expand() {
			const obj = new this.$.$mol_expander()
			
			obj.expanded = (val?: any) => this.expanded(val)
			obj.Trigger = () => this.Expand_head()
			obj.content = () => this.expand_content()
			
			return obj
		}
	}
	
}

