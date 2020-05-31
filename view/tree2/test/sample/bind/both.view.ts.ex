namespace $ {
	export class $mol_view_tree2_test_sample_bind_both extends $mol_view {

		/**
		 * ```tree
		 * writable?val <=> writable_owner?val
		 * ```
		 */
		@ $mol_mem
		writable(val: any) {
			if ( val !== undefined ) return val
			return this.writable_owner(val)
		}

		/**
		 * ```tree
		 * writable_default?val <=> writable_default_owner?val null
		 * ```
		 */
		@ $mol_mem
		writable_default(val: any) {
			if ( val !== undefined ) return val
			return this.writable_default_owner(val)
		}

		/**
		 * ```tree
		 * writable_default_owner?val null
		 * ```
		 */
		@ $mol_mem
		writable_default_owner(val: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * class?val <=> class_owner?val $mol_view
		 * ```
		 */
		@ $mol_mem
		class(val: any) {
			if ( val !== undefined ) return val
			return this.class_owner(val)
		}

		/**
		 * ```tree
		 * class_owner?val $mol_view
		 * ```
		 */
		@ $mol_mem
		class_owner(val: any) {
			if ( val !== undefined ) return val
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
		 * class_writable?val <=> class_writable_owner?val $mol_view
		 * 	some?val <=> twice?val
		 * 	localized?val <=> localized_owner?val @ \some1
		 * 	chain?v <=> chain1?v <=> chain2?v null
		 * ```
		 */
		@ $mol_mem
		class_writable(val: any) {
			if ( val !== undefined ) return val
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
		class_writable_owner(val: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_view()

			obj.some = (val: any) => this.twice(val)
			obj.localized = (val: any) => this.localized_owner(val)
			obj.chain = (v: any) => this.chain1(v)

			return obj
		}

		/**
		 * ```tree
		 * localized_owner?val @ \some1
		 * ```
		 */
		@ $mol_mem
		localized_owner(val: any) {
			if ( val !== undefined ) return val
			return this.$.$mol_locale.text( '$mol_view_tree2_test_sample_bind_both_localized_owner' )
		}

		/**
		 * ```tree
		 * chain1?v <=> chain2?v null
		 * ```
		 */
		@ $mol_mem
		chain1(v: any) {
			if ( v !== undefined ) return v
			return this.chain2(v)
		}

		/**
		 * ```tree
		 * chain2?v null
		 * ```
		 */
		@ $mol_mem
		chain2(v: any) {
			if ( v !== undefined ) return v
			return null as any
		}
	}

}
