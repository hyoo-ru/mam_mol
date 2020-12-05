namespace $ {
	export class $mol_switch extends $mol_view {

		/**
		 * ```tree
		 * Option!id $mol_check
		 * 	checked?val <=> option_checked!id?val
		 * 	label <= option_label!id
		 * 	enabled <= option_enabled!id
		 * 	minimal_height 24
		 * ```
		 */
		@ $mol_mem_key
		Option(id: any) {
			const obj = new this.$.$mol_check()

			obj.checked = (val?: any) => this.option_checked(id, val)
			obj.label = () => this.option_label(id)
			obj.enabled = () => this.option_enabled(id)
			obj.minimal_height = () => 24

			return obj
		}

		/**
		 * ```tree
		 * value?val null
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * options *
		 * ```
		 */
		options() {
			return {

			}
		}

		/**
		 * ```tree
		 * keys /string
		 * ```
		 */
		keys() {
			return [

			] as readonly string[]
		}

		/**
		 * ```tree
		 * sub <= items
		 * ```
		 */
		sub() {
			return this.items()
		}

		/**
		 * ```tree
		 * option_checked!id?val false
		 * ```
		 */
		@ $mol_mem_key
		option_checked(id: any, val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * option_title!id \
		 * ```
		 */
		option_title(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * option_label!id / <= option_title!id
		 * ```
		 */
		option_label(id: any) {
			return [
				this.option_title(id)
			] as readonly any[]
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
		 * option_enabled!id <= enabled
		 * ```
		 */
		option_enabled(id: any) {
			return this.enabled()
		}

		/**
		 * ```tree
		 * items /$mol_check
		 * ```
		 */
		items() {
			return [

			] as readonly $mol_check[]
		}
	}

}
