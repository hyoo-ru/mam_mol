namespace $ {
	export class $mol_string_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \String input field in various states
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_string_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Simple $mol_string value?val <=> name?val \
		 * 	<= Hint $mol_string
		 * 		hint \Batman
		 * 		value?val <=> name?val \
		 * 	<= Filled $mol_string value?val <=> name2?val \Jocker
		 * 	<= Disabled $mol_string
		 * 		disabled true
		 * 		value?val <=> name2?val
		 * ```
		 */
		sub() {
			return [
				this.Simple(),
				this.Hint(),
				this.Filled(),
				this.Disabled()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Simple $mol_string value?val <=> name?val \
		 * ```
		 */
		@ $mol_mem
		Simple() {
			const obj = new this.$.$mol_string()

			obj.value = (val?: any) => this.name(val)

			return obj
		}

		/**
		 * ```tree
		 * name?val \
		 * ```
		 */
		@ $mol_mem
		name(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Hint $mol_string
		 * 	hint \Batman
		 * 	value?val <=> name?val \
		 * ```
		 */
		@ $mol_mem
		Hint() {
			const obj = new this.$.$mol_string()

			obj.hint = () => "Batman"
			obj.value = (val?: any) => this.name(val)

			return obj
		}

		/**
		 * ```tree
		 * Filled $mol_string value?val <=> name2?val \Jocker
		 * ```
		 */
		@ $mol_mem
		Filled() {
			const obj = new this.$.$mol_string()

			obj.value = (val?: any) => this.name2(val)

			return obj
		}

		/**
		 * ```tree
		 * name2?val \Jocker
		 * ```
		 */
		@ $mol_mem
		name2(val?: any) {
			if ( val !== undefined ) return val
			return "Jocker"
		}

		/**
		 * ```tree
		 * Disabled $mol_string
		 * 	disabled true
		 * 	value?val <=> name2?val
		 * ```
		 */
		@ $mol_mem
		Disabled() {
			const obj = new this.$.$mol_string()

			obj.disabled = () => true
			obj.value = (val?: any) => this.name2(val)

			return obj
		}
	}

}
