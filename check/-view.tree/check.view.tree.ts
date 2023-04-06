namespace $ {
	export class $mol_check extends $mol_button_minor {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_check_checked <= checked?
		 * 	aria-checked <= aria_checked
		 * 	role <= aria_role
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_check_checked: this.checked(),
				"aria-checked": this.aria_checked(),
				role: this.aria_role()
			}
		}
		
		/**
		 * ```tree
		 * sub /$mol_view_content
		 * 	<= Icon
		 * 	<= label
		 * ```
		 */
		sub() {
			return [
				this.Icon(),
				this.label()
			] as readonly $mol_view_content[]
		}
		
		/**
		 * ```tree
		 * checked? false
		 * ```
		 */
		@ $mol_mem
		checked(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * aria_checked \false
		 * ```
		 */
		aria_checked() {
			return "false"
		}
		
		/**
		 * ```tree
		 * aria_role \checkbox
		 * ```
		 */
		aria_role() {
			return "checkbox"
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

