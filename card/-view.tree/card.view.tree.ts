namespace $ {
	export class $mol_card extends $mol_list {

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_card_status_type <= status \
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_card_status_type: this.status()
			}
		}

		/**
		 * ```tree
		 * status \
		 * ```
		 */
		status() {
			return ""
		}

		/**
		 * ```tree
		 * rows /$mol_view
		 * 	<= Content $mol_view sub <= content /$mol_view_content
		 * 	<= Status $mol_view
		 * 		minimal_height 30
		 * 		sub / <= status_text <= status \
		 * ```
		 */
		rows() {
			return [
				this.Content(),
				this.Status()
			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * Content $mol_view sub <= content /$mol_view_content
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.content()

			return obj
		}

		/**
		 * ```tree
		 * content /$mol_view_content
		 * ```
		 */
		content() {
			return [

			] as readonly $mol_view_content[]
		}

		/**
		 * ```tree
		 * Status $mol_view
		 * 	minimal_height 30
		 * 	sub / <= status_text <= status \
		 * ```
		 */
		@ $mol_mem
		Status() {
			const obj = new this.$.$mol_view()

			obj.minimal_height = () => 30
			obj.sub = () => [
				this.status_text()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * status_text <= status \
		 * ```
		 */
		status_text() {
			return this.status()
		}
	}

}
