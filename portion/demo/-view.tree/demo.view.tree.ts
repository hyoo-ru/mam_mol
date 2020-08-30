namespace $ {
	export class $mol_portion_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Progress bar in various states
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_portion_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Empty $mol_portion portion <= fist 0
		 * 	<= Partial $mol_portion portion <= second 0.5
		 * 	<= Full $mol_portion portion <= third 1
		 * ```
		 */
		sub() {
			return [
				this.Empty(),
				this.Partial(),
				this.Full()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Empty $mol_portion portion <= fist 0
		 * ```
		 */
		@ $mol_mem
		Empty() {
			const obj = new this.$.$mol_portion()

			obj.portion = () => this.fist()

			return obj
		}

		/**
		 * ```tree
		 * fist 0
		 * ```
		 */
		fist() {
			return 0
		}

		/**
		 * ```tree
		 * Partial $mol_portion portion <= second 0.5
		 * ```
		 */
		@ $mol_mem
		Partial() {
			const obj = new this.$.$mol_portion()

			obj.portion = () => this.second()

			return obj
		}

		/**
		 * ```tree
		 * second 0.5
		 * ```
		 */
		second() {
			return 0.5
		}

		/**
		 * ```tree
		 * Full $mol_portion portion <= third 1
		 * ```
		 */
		@ $mol_mem
		Full() {
			const obj = new this.$.$mol_portion()

			obj.portion = () => this.third()

			return obj
		}

		/**
		 * ```tree
		 * third 1
		 * ```
		 */
		third() {
			return 1
		}
	}

}
