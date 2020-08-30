namespace $ {
	export class $mol_switch_demo extends $mol_demo_small {

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
		 * sub /
		 * 	<= Enabled $mol_switch
		 * 		value?val <=> color?val \red
		 * 		options *
		 * 			red <= option_red @ \Red
		 * 			green <= option_green @ \Green
		 * 			blue <= option_blue @ \Blue
		 * 	<= Disabled $mol_switch
		 * 		value?val <=> color?val \red
		 * 		enabled false
		 * 		options *
		 * 			red <= option_red @ \Red
		 * 			green <= option_green @ \Green
		 * 			blue <= option_blue @ \Blue
		 * ```
		 */
		sub() {
			return [
				this.Enabled(),
				this.Disabled()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Enabled $mol_switch
		 * 	value?val <=> color?val \red
		 * 	options *
		 * 		red <= option_red @ \Red
		 * 		green <= option_green @ \Green
		 * 		blue <= option_blue @ \Blue
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
		 * color?val \red
		 * ```
		 */
		@ $mol_mem
		color(val?: any) {
			if ( val !== undefined ) return val
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
		 * Disabled $mol_switch
		 * 	value?val <=> color?val \red
		 * 	enabled false
		 * 	options *
		 * 		red <= option_red @ \Red
		 * 		green <= option_green @ \Green
		 * 		blue <= option_blue @ \Blue
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
	}

}
