namespace $ {
	export class $mol_link_iconed extends $mol_link {

		/**
		 * ```tree
		 * sub / <= Icon
		 * ```
		 */
		sub() {
			return [
				this.Icon()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * content / <= title
		 * ```
		 */
		content() {
			return [
				this.title()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * host \
		 * ```
		 */
		host() {
			return ""
		}

		/**
		 * ```tree
		 * icon \
		 * ```
		 */
		icon() {
			return ""
		}

		/**
		 * ```tree
		 * Icon $mol_image
		 * 	uri <= icon
		 * 	title \
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_image()

			obj.uri = () => this.icon()
			obj.title = () => ""

			return obj
		}

		/**
		 * ```tree
		 * title <= uri
		 * ```
		 */
		title() {
			return this.uri()
		}
	}

}
