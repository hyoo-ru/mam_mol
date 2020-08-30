namespace $ {
	export class $mol_section extends $mol_list {

		/**
		 * ```tree
		 * rows /
		 * 	<= Head $mol_view sub <= head /
		 * 	<= Content null
		 * ```
		 */
		rows() {
			return [
				this.Head(),
				this.Content()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Head $mol_view sub <= head /
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.head()

			return obj
		}

		/**
		 * ```tree
		 * head /
		 * ```
		 */
		head() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Content null
		 * ```
		 */
		Content() {
			return null as any
		}
	}

}
