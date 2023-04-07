namespace $ {
	export class $mol_button_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \All types of buttons in every states
		 * ```
		 */
		title() {
			return "All types of buttons in every states"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Major_enabled
		 * 	<= Major_disabled
		 * 	<= Minor_enabled
		 * 	<= Minor_disabled
		 * 	<= Minor_icon_only
		 * 	<= Minor_iconed
		 * ```
		 */
		sub() {
			return [
				this.Major_enabled(),
				this.Major_disabled(),
				this.Minor_enabled(),
				this.Minor_disabled(),
				this.Minor_icon_only(),
				this.Minor_iconed()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags / \button
		 * ```
		 */
		tags() {
			return [
				"button"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Control/Button
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control/Button"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * fail?event null
		 * ```
		 */
		@ $mol_mem
		fail(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Major_enabled $mol_button_major
		 * 	title \Enabled Major
		 * 	click?event <=> fail?event
		 * ```
		 */
		@ $mol_mem
		Major_enabled() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => "Enabled Major"
			obj.click = (event?: any) => this.fail(event)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Major_disabled $mol_button_major
		 * 	title \Disabled Major
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Major_disabled() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => "Disabled Major"
			obj.enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_enabled $mol_button_minor
		 * 	title \Enabled Minor
		 * 	click?event <=> fail?event
		 * ```
		 */
		@ $mol_mem
		Minor_enabled() {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => "Enabled Minor"
			obj.click = (event?: any) => this.fail(event)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_disabled $mol_button_minor
		 * 	title \Disabled Minor
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Minor_disabled() {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => "Disabled Minor"
			obj.enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_icon_only_icon $mol_icon_cursor_default_click_outline
		 * ```
		 */
		@ $mol_mem
		Minor_icon_only_icon() {
			const obj = new this.$.$mol_icon_cursor_default_click_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_icon_only $mol_button_minor
		 * 	click?event <=> fail?event
		 * 	sub / <= Minor_icon_only_icon
		 * ```
		 */
		@ $mol_mem
		Minor_icon_only() {
			const obj = new this.$.$mol_button_minor()
			
			obj.click = (event?: any) => this.fail(event)
			obj.sub = () => [
				this.Minor_icon_only_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_iconed_icon $mol_icon_cursor_default_click_outline
		 * ```
		 */
		@ $mol_mem
		Minor_iconed_icon() {
			const obj = new this.$.$mol_icon_cursor_default_click_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_iconed $mol_button_minor
		 * 	click?event <=> fail?event
		 * 	sub /
		 * 		<= Minor_iconed_icon
		 * 		\Minor with Icon
		 * ```
		 */
		@ $mol_mem
		Minor_iconed() {
			const obj = new this.$.$mol_button_minor()
			
			obj.click = (event?: any) => this.fail(event)
			obj.sub = () => [
				this.Minor_iconed_icon(),
				"Minor with Icon"
			] as readonly any[]
			
			return obj
		}
	}
	
}

