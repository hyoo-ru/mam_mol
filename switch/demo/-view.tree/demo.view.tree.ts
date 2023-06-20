namespace $ {
	export class $mol_switch_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title \Color switchers in various state
		 * ```
		 */
		title() {
			return "Color switchers in various state"
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
		 * 	\option
		 * 	\group
		 * 	\radio
		 * ```
		 */
		tags() {
			return [
				"option",
				"group",
				"radio"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Control
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * color? \red
		 * ```
		 */
		@ $mol_mem
		color(next?: any) {
			if ( next !== undefined ) return next as never
			return "red"
		}
		
		/**
		 * ```tree
		 * option_red \Red
		 * ```
		 */
		option_red() {
			return "Red"
		}
		
		/**
		 * ```tree
		 * option_green \Green
		 * ```
		 */
		option_green() {
			return "Green"
		}
		
		/**
		 * ```tree
		 * option_blue \Blue
		 * ```
		 */
		option_blue() {
			return "Blue"
		}
		
		/**
		 * ```tree
		 * option_infernal \Color which can not be displayed on your device
		 * ```
		 */
		option_infernal() {
			return "Color which can not be displayed on your device"
		}
		
		/**
		 * ```tree
		 * Enabled $mol_switch
		 * 	value? <=> color?
		 * 	options *
		 * 		red <= option_red
		 * 		green <= option_green
		 * 		blue <= option_blue
		 * 		infernal <= option_infernal
		 * ```
		 */
		@ $mol_mem
		Enabled() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.color(next)
			obj.options = () => ({
				red: this.option_red(),
				green: this.option_green(),
				blue: this.option_blue(),
				infernal: this.option_infernal()
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Enabled_labeler $mol_labeler
		 * 	title \Read/Write
		 * 	Content <= Enabled
		 * ```
		 */
		@ $mol_mem
		Enabled_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Read/Write"
			obj.Content = () => this.Enabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Disabled $mol_switch
		 * 	value? <=> color?
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
			
			obj.value = (next?: any) => this.color(next)
			obj.enabled = () => false
			obj.options = () => ({
				red: this.option_red(),
				green: this.option_green(),
				blue: this.option_blue()
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Disabled_labeler $mol_labeler
		 * 	title \Read only
		 * 	Content <= Disabled
		 * ```
		 */
		@ $mol_mem
		Disabled_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Read only"
			obj.Content = () => this.Disabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Demo_items $mol_list sub /
		 * 	<= Enabled_labeler
		 * 	<= Disabled_labeler
		 * ```
		 */
		@ $mol_mem
		Demo_items() {
			const obj = new this.$.$mol_list()
			
			obj.sub = () => [
				this.Enabled_labeler(),
				this.Disabled_labeler()
			] as readonly any[]
			
			return obj
		}
	}
	
}

