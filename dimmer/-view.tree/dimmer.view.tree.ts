namespace $ {
	export class $mol_dimmer extends $mol_paragraph {

		/**
		 * ```tree
		 * haystack \
		 * ```
		 */
		haystack() {
			return ""
		}

		/**
		 * ```tree
		 * needle \
		 * ```
		 */
		needle() {
			return ""
		}

		/**
		 * ```tree
		 * sub <= parts /$mol_view_content
		 * ```
		 */
		sub() {
			return this.parts()
		}

		/**
		 * ```tree
		 * parts /$mol_view_content
		 * ```
		 */
		parts() {
			return [

			] as readonly $mol_view_content[]
		}

		/**
		 * ```tree
		 * Low!id $mol_paragraph sub / <= string!id \
		 * ```
		 */
		@ $mol_mem_key
		Low(id: any) {
			const obj = new this.$.$mol_paragraph()

			obj.sub = () => [
				this.string(id)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * string!id \
		 * ```
		 */
		string(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * High!id $mol_paragraph sub / <= string!id \
		 * ```
		 */
		@ $mol_mem_key
		High(id: any) {
			const obj = new this.$.$mol_paragraph()

			obj.sub = () => [
				this.string(id)
			] as readonly any[]

			return obj
		}
	}

}
