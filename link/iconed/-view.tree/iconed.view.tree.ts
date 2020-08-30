namespace $ {
	export class $mol_link_iconed extends $mol_link {

		/**
		 * ```tree
		 * sub / <= Icon $mol_image
		 * 	uri <= icon \
		 * 	title \
		 * ```
		 */
		sub() {
			return [
				this.Icon()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Icon $mol_image
		 * 	uri <= icon \
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
		 * icon \
		 * ```
		 */
		icon() {
			return ""
		}

		/**
		 * ```tree
		 * content / <= title <= uri
		 * ```
		 */
		content() {
			return [
				this.title()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * title <= uri
		 * ```
		 */
		title() {
			return this.uri()
		}

		/**
		 * ```tree
		 * host \
		 * ```
		 */
		host() {
			return ""
		}
	}

}
