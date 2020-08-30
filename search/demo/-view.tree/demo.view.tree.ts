namespace $ {
	export class $mol_search_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Simple search field with suggest
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_search_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Search $mol_search
		 * 	query => query
		 * 	suggests <= suggests /
		 * ```
		 */
		sub() {
			return [
				this.Search()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Search $mol_search
		 * 	query => query
		 * 	suggests <= suggests /
		 * ```
		 */
		@ $mol_mem
		Search() {
			const obj = new this.$.$mol_search()

			obj.suggests = () => this.suggests()

			return obj
		}

		/**
		 * ```tree
		 * query
		 * ```
		 */
		query() {
			return this.Search().query()
		}

		/**
		 * ```tree
		 * suggests /
		 * ```
		 */
		suggests() {
			return [

			] as readonly any[]
		}
	}

}
