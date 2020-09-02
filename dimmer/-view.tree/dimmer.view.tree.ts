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
		 * sub <= parts
		 * ```
		 */
		sub() {
			return this.parts()
		}

		/**
		 * ```tree
		 * Low!id $mol_paragraph sub / <= string!id
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
		 * High!id $mol_paragraph sub / <= string!id
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
		 * string!id \
		 * ```
		 */
		string(id: any) {
			return ""
		}
	}

}
