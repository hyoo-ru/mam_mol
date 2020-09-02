namespace $ {
	export class $mol_toolbar extends $mol_view {

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_toolbar_expanded <= expanded
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_toolbar_expanded: this.expanded()
			}
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Bar
		 * 	<= Expand
		 * ```
		 */
		sub() {
			return [
				this.Bar(),
				this.Expand()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * items /$mol_view
		 * ```
		 */
		items() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * Bar $mol_view sub <= items
		 * ```
		 */
		@ $mol_mem
		Bar() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.items()

			return obj
		}

		/**
		 * ```tree
		 * expanded?val false
		 * ```
		 */
		@ $mol_mem
		expanded(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Expand $mol_check_expand checked?val <=> expanded?val
		 * ```
		 */
		@ $mol_mem
		Expand() {
			const obj = new this.$.$mol_check_expand()

			obj.checked = (val?: any) => this.expanded(val)

			return obj
		}
	}

}
