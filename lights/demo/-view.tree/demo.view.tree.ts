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
		 * sub / <= Sample
		 * ```
		 */
		sub() {
			return [
				this.Sample()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\light
		 * 	\dark
		 * 	\theme
		 * 	\switcher
		 * ```
		 */
		tags() {
			return [
				"light",
				"dark",
				"theme",
				"switcher"
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
		 * Sample $mol_view
		 * 	plugins / <= Theme
		 * 	sub / <= Lighter
		 * ```
		 */
		@ $mol_mem
		Sample() {
			const obj = new this.$.$mol_view()
			
			obj.plugins = () => [
				this.Theme()
			] as readonly any[]
			obj.sub = () => [
				this.Lighter()
			] as readonly any[]
			
			return obj
		}
	}
	
}

