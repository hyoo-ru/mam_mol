namespace $ {
	export class $mol_view_tree2_to_js_test_ex_right_hierarchy_bar extends $mol_object {
		@ $mol_mem
		title(next?: number) {
			return 123 + (next ?? 0)
		}
		id() {
			return 0
		}

		@ $mol_mem_key
		domain(id: number) {
			return {
				user() {
					return {
						id() {
							return 1 + id
						}
					}
				}
			}
		}
	}
}
