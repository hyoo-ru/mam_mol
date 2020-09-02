namespace $ {
	export class $mol_cost extends $mol_view {

		/**
		 * ```tree
		 * value null
		 * ```
		 */
		value() {
			return null as any
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Prefix
		 * 	<= Value
		 * 	<= Postfix
		 * ```
		 */
		sub() {
			return [
				this.Prefix(),
				this.Value(),
				this.Postfix()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * prefix \
		 * ```
		 */
		prefix() {
			return ""
		}

		/**
		 * ```tree
		 * Prefix $mol_view sub / <= prefix
		 * ```
		 */
		@ $mol_mem
		Prefix() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.prefix()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * value_view \
		 * ```
		 */
		value_view() {
			return ""
		}

		/**
		 * ```tree
		 * Value $mol_view sub / <= value_view
		 * ```
		 */
		@ $mol_mem
		Value() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.value_view()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * postfix \
		 * ```
		 */
		postfix() {
			return ""
		}

		/**
		 * ```tree
		 * Postfix $mol_view sub / <= postfix
		 * ```
		 */
		@ $mol_mem
		Postfix() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.postfix()
			] as readonly any[]

			return obj
		}
	}

}
