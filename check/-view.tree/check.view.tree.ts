namespace $ {
	export class $mol_check extends $mol_button_minor {

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_check_checked <= checked?val
		 * 	aria-checked <= checked?val
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
		 * sub /
		 * 	<= Icon
		 * 	<= label
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
		 * Icon null
		 * ```
		 */
		Icon() {
			return null as any
		}

		/**
		 * ```tree
		 * title \
		 * ```
		 */
		title() {
			return ""
		}

		/**
		 * ```tree
		 * Title $mol_view sub / <= title
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
		 * label / <= Title
		 * ```
		 */
		label() {
			return [
				this.Title()
			] as readonly any[]
		}
	}

}
