namespace $ {
	export class $mol_view_tree2_test_sample_bind_left extends $mol_view {

		/**
		 * ```tree
		 * default <= default_owner \test
		 * ```
		 */
		default() {
			return this.default_owner()
		}

		/**
		 * ```tree
		 * default_owner \test
		 * ```
		 */
		default_owner() {
			return "test"
		}

		/**
		 * ```tree
		 * empty <= empty_owner
		 * ```
		 */
		empty() {
			return this.empty_owner()
		}

		/**
		 * ```tree
		 * indexed!key <= indexed_owner!key
		 * ```
		 */
		indexed(key: any) {
			return this.indexed_owner(key)
		}

		/**
		 * ```tree
		 * indexed_default!key <= indexed_default_owner!key null
		 * ```
		 */
		indexed_default(key: any) {
			return this.indexed_default_owner(key)
		}

		/**
		 * ```tree
		 * indexed_default_owner!key null
		 * ```
		 */
		indexed_default_owner(key: any) {
			return null as any
		}

		/**
		 * ```tree
		 * class <= class_owner $mol_view
		 * ```
		 */
		class() {
			return this.class_owner()
		}

		/**
		 * ```tree
		 * class_owner $mol_view
		 * ```
		 */
		@ $mol_mem
		class_owner() {
			const obj = new this.$.$mol_view()


			return obj
		}

		/**
		 * ```tree
		 * twice null
		 * ```
		 */
		twice() {
			return null as any
		}

		/**
		 * ```tree
		 * class_indexed!key <= class_indexed_owner!key $mol_view
		 * 	title @ \some1
		 * 	some <= twice
		 * 	localized <= localized_owner!key @ \some1
		 * 	chain <= chain1 <= chain2 null
		 * ```
		 */
		class_indexed(key: any) {
			return this.class_indexed_owner(key)
		}

		/**
		 * ```tree
		 * class_indexed_owner!key $mol_view
		 * 	title @ \some1
		 * 	some <= twice
		 * 	localized <= localized_owner!key @ \some1
		 * 	chain <= chain1 <= chain2 null
		 * ```
		 */
		@ $mol_mem_key
		class_indexed_owner(key: any) {
			const obj = new this.$.$mol_view()

			obj.title = () => this.$.$mol_locale.text( '$mol_view_tree2_test_sample_bind_left_class_indexed_owner_title' )
			obj.some = () => this.twice()
			obj.localized = () => this.localized_owner(key)
			obj.chain = () => this.chain1()

			return obj
		}

		/**
		 * ```tree
		 * localized_owner!key @ \some1
		 * ```
		 */
		localized_owner(key: any) {
			return this.$.$mol_locale.text( '$mol_view_tree2_test_sample_bind_left_localized_owner' )
		}

		/**
		 * ```tree
		 * chain1 <= chain2 null
		 * ```
		 */
		chain1() {
			return this.chain2()
		}

		/**
		 * ```tree
		 * chain2 null
		 * ```
		 */
		chain2() {
			return null as any
		}

		/**
		 * ```tree
		 * arr /
		 * 	* loc <= loc_outer @ \test localize
		 * 	* loc <= loc_outer @ \test localize
		 * ```
		 */
		arr() {
			return [
				{
					loc: this.loc_outer(),
				},
				{
					loc: this.loc_outer(),
				},
			] as readonly any[]
		}

		/**
		 * ```tree
		 * loc_outer @ \test localize
		 * ```
		 */
		loc_outer() {
			return this.$.$mol_locale.text( '$mol_view_tree2_test_sample_bind_left_loc_outer' )
		}
	}

}
