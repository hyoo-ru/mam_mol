namespace $ {
	export class $mol_view_tree2_to_js_test_ex_right_hierarchy_bar extends $mol_object {
		title() {
			return 123
		}

		domain(id: string) {
			return {
				user() {
					return {
						id() {
							return 1
						}
					}
				}
			}
		}
	}
}
