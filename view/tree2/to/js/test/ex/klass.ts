namespace $ {
	export type $mol_view_tree2_to_js_test_ex_klass_tuple_type = 'a' | 'b' | 'c'

	export class $mol_view_tree2_to_js_test_ex_klass_tuple<V = string> extends $mol_object {
		constructor(readonly tuple: readonly string[] = [], readonly some?: { type: V }) {
			super()
		}
	}
}
