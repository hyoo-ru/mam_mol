namespace $ {
	export class $mol_view_tree2_test_sample_bind_both extends $mol_view {

		/**
		 * ```tree
		 * writable?val <=> writable_owner?val
		 * ```
		 */
		writable(val?: any) {
			return this.writable_owner(val)
		}

		/**
		 * ```tree
		 * writable_default?val <=> writable_default_owner?val null
		 * ```
		 */
		writable_default(val?: any) {
			return this.writable_default_owner(val)
		}

		/**
		 * ```tree
		 * writable_default_owner?val null
		 * ```
		 */
		@ $mol_mem
		writable_default_owner(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * class?val <=> class_owner?val $mol_view
		 * ```
		 */
		class(val?: any) {
			return this.class_owner(val)
		}

		/**
		 * ```tree
		 * class_owner?val $mol_view
		 * ```
		 */
		@ $mol_mem
		class_owner(val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_view()

			return obj
		}

		/**
		 * ```tree
		 * indexed!key?val <=> indexed_owner!key?val null
		 * ```
		 */
		indexed(key: any, val?: any) {
			return this.indexed_owner(key, val)
		}

		/**
		 * ```tree
		 * indexed_owner!key?val null
		 * ```
		 */
		@ $mol_mem_key
		indexed_owner(key: any, val?: any) {
			if ( val !== undefined ) return val
			return null as any
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
		 * class_indexed!key?val $mol_view expanded <=> cell_expanded!key?val
		 * ```
		 */
		@ $mol_mem_key
		class_indexed(key: any, val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_view()

			obj.expanded = () => this.cell_expanded(key, val)

			return obj
		}

		/**
		 * ```tree
		 * class_writable?val <=> class_writable_owner?val $mol_view
		 * 	some?val <=> twice?val
		 * 	localized?val <=> localized_owner?val @ \some1
		 * 	chain?v <=> chain1?v <=> chain2?v null
		 * ```
		 */
		class_writable(val?: any) {
			return this.class_writable_owner(val)
		}

		/**
		 * ```tree
		 * class_writable_owner?val $mol_view
		 * 	some?val <=> twice?val
		 * 	localized?val <=> localized_owner?val @ \some1
		 * 	chain?v <=> chain1?v <=> chain2?v null
		 * ```
		 */
		@ $mol_mem
		class_writable_owner(val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_view()

			obj.some = (val?: any) => this.twice(val)
			obj.localized = (val?: any) => this.localized_owner(val)
			obj.chain = (v?: any) => this.chain1(v)

			return obj
		}

		/**
		 * ```tree
		 * localized_owner?val @ \some1
		 * ```
		 */
		@ $mol_mem
		localized_owner(val?: any) {
			if ( val !== undefined ) return val
			return this.$.$mol_locale.text( '$mol_view_tree2_test_sample_bind_both_localized_owner' )
		}

		/**
		 * ```tree
		 * chain1?v <=> chain2?v null
		 * ```
		 */
		chain1(v?: any) {
			return this.chain2(v)
		}

		/**
		 * ```tree
		 * chain2?v null
		 * ```
		 */
		@ $mol_mem
		chain2(v?: any) {
			if ( v !== undefined ) return v
			return null as any
		}

		/**
		 * ```tree
		 * arr /
		 * 	* loc?v <=> loc_outer?v @ \test localize
		 * 	* loc?v <=> loc_outer?v @ \test localize
		 * ```
		 */
		arr() {
			return [
				{
					loc: (v?: any) => this.loc_outer(v)
				},
				{
					loc: (v?: any) => this.loc_outer(v)
				}
			] as readonly any[]
		}

		/**
		 * ```tree
		 * loc_outer?v @ \test localize
		 * ```
		 */
		@ $mol_mem
		loc_outer(v?: any) {
			if ( v !== undefined ) return v
			return this.$.$mol_locale.text( '$mol_view_tree2_test_sample_bind_both_loc_outer' )
		}
	}

}
