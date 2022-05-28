namespace $ {
	export class $mol_lights_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Switcher between light/dark themes (usually for `$mol_theme_auto` plugin).
		 * ```
		 */
		title() {
			return "Switcher between light/dark themes (usually for `$mol_theme_auto` plugin)."
		}
		
		/**
		 * ```tree
		 * sub / <= sample
		 * ```
		 */
		sub() {
			return [
				this.sample()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Theme $mol_theme_auto
		 * ```
		 */
		@ $mol_mem
		Theme() {
			const obj = new this.$.$mol_theme_auto()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Lighter $mol_lights_toggle
		 * ```
		 */
		@ $mol_mem
		Lighter() {
			const obj = new this.$.$mol_lights_toggle()
			
			return obj
		}
		
		/**
		 * ```tree
		 * sample $mol_page
		 * 	plugins / <= Theme
		 * 	tools / <= Lighter
		 * ```
		 */
		@ $mol_mem
		sample() {
			const obj = new this.$.$mol_page()
			
			obj.plugins = () => [
				this.Theme()
			] as readonly any[]
			obj.tools = () => [
				this.Lighter()
			] as readonly any[]
			
			return obj
		}
	}
	
}

