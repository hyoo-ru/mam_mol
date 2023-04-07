namespace $ {
	export class $mol_search_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Search field with suggest
		 * ```
		 */
		title() {
			return "Search field with suggest "
		}
		
		/**
		 * ```tree
		 * sub / <= Search
		 * ```
		 */
		sub() {
			return [
				this.Search()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\search
		 * 	\suggest
		 * 	\autocomplete
		 * 	\string
		 * 	\fulltext
		 * 	\filter
		 * ```
		 */
		tags() {
			return [
				"search",
				"suggest",
				"autocomplete",
				"string",
				"fulltext",
				"filter"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Control
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control"
			] as readonly any[]
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
		 * Search $mol_search
		 * 	query => query
		 * 	suggests <= suggests
		 * ```
		 */
		@ $mol_mem
		Search() {
			const obj = new this.$.$mol_search()
			
			obj.suggests = () => this.suggests()
			
			return obj
		}
	}
	
}

