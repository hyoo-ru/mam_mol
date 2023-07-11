namespace $ {
	export class $mol_dump_value extends $mol_view {
		
		/**
		 * ```tree
		 * value? null
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * preview_show? true
		 * ```
		 */
		@ $mol_mem
		preview_show(next?: any) {
			if ( next !== undefined ) return next as never
			return true
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
		 * expand_all? null
		 * ```
		 */
		@ $mol_mem
		expand_all(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
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
		 * 	expanded? <=> expanded?
		 * 	expandable <= expandable
		 * 	clicks? <=> expand_all?
		 * 	label / <= Expand_title
		 * ```
		 */
		@ $mol_mem
		Expand_head() {
			const obj = new this.$.$mol_check_expand()
			
			obj.minimal_height = () => 24
			obj.minimal_width = () => 24
			obj.expanded = (next?: any) => this.expanded(next)
			obj.expandable = () => this.expandable()
			obj.clicks = (next?: any) => this.expand_all(next)
			obj.label = () => [
				this.Expand_title()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * preview_dom null
		 * ```
		 */
		preview_dom() {
			return null as any
		}
		
		/**
		 * ```tree
		 * preview null
		 * ```
		 */
		preview() {
			return null as any
		}
		
		/**
		 * ```tree
		 * Preview_dom $mol_view
		 * 	dom_node <= preview_dom
		 * 	render <= preview
		 * ```
		 */
		@ $mol_mem
		Preview_dom() {
			const obj = new this.$.$mol_view()
			
			obj.dom_node = () => this.preview_dom()
			obj.render = () => this.preview()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Preview $mol_view sub / <= Preview_dom
		 * ```
		 */
		@ $mol_mem
		Preview() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Preview_dom()
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
		 * prototypes false
		 * ```
		 */
		prototypes() {
			return false
		}
		
		/**
		 * ```tree
		 * Row*0 $mol_dump_list
		 * 	values <= row_values*
		 * 	prototypes <= prototypes
		 * 	preview_show <= preview_show
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_dump_list()
			
			obj.values = () => this.row_values(id)
			obj.prototypes = () => this.prototypes()
			obj.preview_show = () => this.preview_show()
			
			return obj
		}
		
		/**
		 * ```tree
		 * expand_content /
		 * 	<= Preview
		 * 	<= Row*0
		 * ```
		 */
		expand_content() {
			return [
				this.Preview(),
				this.Row("0")
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Expand $mol_expander
		 * 	expanded? <=> expanded?
		 * 	Trigger <= Expand_head
		 * 	content <= expand_content
		 * ```
		 */
		@ $mol_mem
		Expand() {
			const obj = new this.$.$mol_expander()
			
			obj.expanded = (next?: any) => this.expanded(next)
			obj.Trigger = () => this.Expand_head()
			obj.content = () => this.expand_content()
			
			return obj
		}
	}
	
}

