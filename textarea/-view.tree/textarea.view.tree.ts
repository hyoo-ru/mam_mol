namespace $ {
	export class $mol_textarea extends $mol_view {
		
		/**
		 * ```tree
		 * attr * mol_textarea_clickable <= clickable?val
		 * ```
		 */
		attr() {
			return {
				mol_textarea_clickable: this.clickable()
			}
		}
		
		/**
		 * ```tree
		 * event *
		 * 	keydown?event <=> press?event
		 * 	pointermove?event <=> hover?event
		 * ```
		 */
		event() {
			return {
				keydown: (event?: any) => this.press(event),
				pointermove: (event?: any) => this.hover(event)
			}
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Edit
		 * 	<= View
		 * ```
		 */
		sub() {
			return [
				this.Edit(),
				this.View()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * clickable?val false
		 * ```
		 */
		@ $mol_mem
		clickable(val?: any) {
			if ( val !== undefined ) return val
			return false
		}
		
		/**
		 * ```tree
		 * press?event null
		 * ```
		 */
		@ $mol_mem
		press(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}
		
		/**
		 * ```tree
		 * hover?event null
		 * ```
		 */
		@ $mol_mem
		hover(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}
		
		/**
		 * ```tree
		 * value?val \
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}
		
		/**
		 * ```tree
		 * hint \
		 * ```
		 */
		hint() {
			return ""
		}
		
		/**
		 * ```tree
		 * enabled true
		 * ```
		 */
		enabled() {
			return true
		}
		
		/**
		 * ```tree
		 * length_max Infinity
		 * ```
		 */
		length_max() {
			return Infinity
		}
		
		/**
		 * ```tree
		 * Edit $mol_string
		 * 	dom_name \textarea
		 * 	value?val <=> value?val
		 * 	hint <= hint
		 * 	enabled <= enabled
		 * 	length_max <= length_max
		 * ```
		 */
		@ $mol_mem
		Edit() {
			const obj = new this.$.$mol_string()
			
			obj.dom_name = () => "textarea"
			obj.value = (val?: any) => this.value(val)
			obj.hint = () => this.hint()
			obj.enabled = () => this.enabled()
			obj.length_max = () => this.length_max()
			
			return obj
		}
		
		/**
		 * ```tree
		 * View $mol_text_code
		 * 	text <= value
		 * 	render_visible_only false
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_text_code()
			
			obj.text = () => this.value()
			obj.render_visible_only = () => false
			
			return obj
		}
	}
	
}

