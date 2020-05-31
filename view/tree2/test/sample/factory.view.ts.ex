namespace $ {
	export class $mol_view_tree2_test_sample_factory extends $mol_view {

		/**
		 * ```tree
		 * Simple $mol_view
		 * 	str \some
		 * 	num 12317
		 * 	bool true
		 * 	nul null
		 * 	localized @ \localized value
		 * ```
		 */
		@ $mol_mem
		Simple() {
			const obj = new this.$.$mol_view()

			obj.str = () => "some"
			obj.num = () => 12317
			obj.bool = () => true
			obj.nul = () => null as any
			obj.localized = () => this.$.$mol_locale.text( '$mol_view_tree2_test_sample_factory_Simple_localized' )

			return obj
		}

		/**
		 * ```tree
		 * Complex $mol_view
		 * 	arr /
		 * 		\test1
		 * 		\test2
		 * 	dict *
		 * 		str \some2
		 * 		localized @ \localized value
		 * ```
		 */
		@ $mol_mem
		Complex() {
			const obj = new this.$.$mol_view()

			obj.arr = () => [
				"test1",
				"test2",
			] as readonly any[]
			obj.dict = () => ({
				str: "some2",
				localized: this.$.$mol_locale.text( '$mol_view_tree2_test_sample_factory_Complex_dict_localized' ),
			})

			return obj
		}
	}

}
