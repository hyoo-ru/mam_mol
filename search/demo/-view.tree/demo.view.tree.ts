namespace $ {
	export class $mol_search_demo extends $mol_demo_small {
		
		/**
		 * ```tree
		 * title @ \Search field with suggest
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_search_demo_title' )
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
		 * 	\string
		 * 	\fulltext
		 * 	\filter
		 * ```
		 */
		tags() {
			return [
				"search",
				"suggest",
				"string",
				"fulltext",
				"filter"
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

