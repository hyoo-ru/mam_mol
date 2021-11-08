namespace $ {
	export class $mol_switch_demo extends $mol_demo {
		
		/**
		 * ```tree
		 * title @ \Color switchers in various state
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_switch_demo_title' )
		}
		
		/**
		 * ```tree
		 * sub / <= Demo_items
		 * ```
		 */
		sub() {
			return [
				this.Demo_items()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\switch
		 * 	\option
		 * ```
		 */
		tags() {
			return [
				"switch",
				"option"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * color?val \red
		 * ```
		 */
		@ $mol_mem
		color(val?: any) {
			if ( val !== undefined ) return val as never
			return "red"
		}
		
		/**
		 * ```tree
		 * option_red @ \Red
		 * ```
		 */
		option_red() {
			return this.$.$mol_locale.text( '$mol_switch_demo_option_red' )
		}
		
		/**
		 * ```tree
		 * option_green @ \Green
		 * ```
		 */
		option_green() {
			return this.$.$mol_locale.text( '$mol_switch_demo_option_green' )
		}
		
		/**
		 * ```tree
		 * option_blue @ \Blue
		 * ```
		 */
		option_blue() {
			return this.$.$mol_locale.text( '$mol_switch_demo_option_blue' )
		}
		
		/**
		 * ```tree
		 * Enabled $mol_switch
		 * 	value?val <=> color?val
		 * 	options *
		 * 		red <= option_red
		 * 		green <= option_green
		 * 		blue <= option_blue
		 * ```
		 */
		@ $mol_mem
		Enabled() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (val?: any) => this.color(val)
			obj.options = () => ({
				red: this.option_red(),
				green: this.option_green(),
				blue: this.option_blue()
			})
			
			return obj
		}
		
		/**
		 * ```tree
		 * Disabled $mol_switch
		 * 	value?val <=> color?val
		 * 	enabled false
		 * 	options *
		 * 		red <= option_red
		 * 		green <= option_green
		 * 		blue <= option_blue
		 * ```
		 */
		@ $mol_mem
		Disabled() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (val?: any) => this.color(val)
			obj.enabled = () => false
			obj.options = () => ({
				red: this.option_red(),
				green: this.option_green(),
				blue: this.option_blue()
			})
			
			return obj
		}
		
		/**
		 * ```tree
		 * Demo_items $mol_list rows /
		 * 	<= Enabled
		 * 	<= Disabled
		 * ```
		 */
		@ $mol_mem
		Demo_items() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Enabled(),
				this.Disabled()
			] as readonly any[]
			
			return obj
		}
	}
	
}

