namespace $ {
	export class $mol_check extends $mol_button_minor {

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_check_checked <= checked?val false
		 * 	aria-checked <= checked?val false
		 * 	role \checkbox
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_check_checked: this.checked(),
				"aria-checked": this.checked(),
				role: "checkbox"
			}
		}

		/**
		 * ```tree
		 * checked?val false
		 * ```
		 */
		@ $mol_mem
		checked(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Icon null
		 * 	<= label / <= Title $mol_view sub / <= title \
		 * ```
		 */
		sub() {
			return [
				this.Icon(),
				this.label()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Icon null
		 * ```
		 */
		Icon() {
			return null as any
		}

		/**
		 * ```tree
		 * label / <= Title $mol_view sub / <= title \
		 * ```
		 */
		label() {
			return [
				this.Title()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Title $mol_view sub / <= title \
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.title()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * title \
		 * ```
		 */
		title() {
			return ""
		}
	}

}
