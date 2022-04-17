namespace $ {
	export class $mol_button_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title @ \All types of buttons in every states
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_button_demo_title' )
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Major_enabled
		 * 	<= Major_disabled
		 * 	<= Minor_enabled
		 * 	<= Minor_disabled
		 * 	<= Minor_icon_enabled
		 * ```
		 */
		sub() {
			return [
				this.Major_enabled(),
				this.Major_disabled(),
				this.Minor_enabled(),
				this.Minor_disabled(),
				this.Minor_icon_enabled()
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
		 * 	title @ \Enabled Major
		 * 	click?event <=> fail?event
		 * ```
		 */
		@ $mol_mem
		Major_enabled() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_button_demo_Major_enabled_title' )
			obj.click = (event?: any) => this.fail(event)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Major_disabled $mol_button_major
		 * 	title @ \Disabled Major
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Major_disabled() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_button_demo_Major_disabled_title' )
			obj.enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_enabled $mol_button_minor
		 * 	title @ \Enabled Minor
		 * 	click?event <=> fail?event
		 * ```
		 */
		@ $mol_mem
		Minor_enabled() {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_button_demo_Minor_enabled_title' )
			obj.click = (event?: any) => this.fail(event)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_disabled $mol_button_minor
		 * 	title @ \Disabled Minor
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Minor_disabled() {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_button_demo_Minor_disabled_title' )
			obj.enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_icon $mol_icon_cursor_default_click_outline
		 * ```
		 */
		@ $mol_mem
		Minor_icon() {
			const obj = new this.$.$mol_icon_cursor_default_click_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Minor_icon_enabled $mol_button_minor
		 * 	click?event <=> fail?event
		 * 	sub /
		 * 		<= Minor_icon
		 * 		\Minor with Icon
		 * ```
		 */
		@ $mol_mem
		Minor_icon_enabled() {
			const obj = new this.$.$mol_button_minor()
			
			obj.click = (event?: any) => this.fail(event)
			obj.sub = () => [
				this.Minor_icon(),
				"Minor with Icon"
			] as readonly any[]
			
			return obj
		}
	}
	
}

