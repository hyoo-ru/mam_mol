namespace $.$$ {

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_tag_tree_demo
	 */
	export class $mol_tag_tree extends $.$mol_tag_tree {
		@ $mol_mem_key
		override sieve_sub(path: readonly string[]) {
			return this.sieve().select(path.at(-1)!)
		}

		@ $mol_mem
		override item_list() {
			const prefix = this.sieve().prefix()

			return this.sieve().ids().sort(this.sort_items()).map(id => this.Item([ ...prefix, id ]))
		}

		@ $mol_mem
		override tag_list() {
			const prefix = this.sieve().prefix()

			return this.sieve().tags().sort(this.sort_tags()).map(tag => this.Tag([ ...prefix, tag ]))
		}

		@ $mol_mem_key
		override tag_expanded( id: readonly string[], next?: boolean ) {
			return next ?? this.tag_expanded_default(id)
		}

		tag_expanded_default(id: readonly string[]) {
			return this.levels_expanded() >= id.length
		}

		@ $mol_mem
		override sort_tags() {
			return $mol_compare_text()
		}

		@ $mol_mem
		override sort_items() {
			return this.sort_tags()
		}

		override tag_names() {
			return {} as Record<string, string>
		}

		override tag_name( path: readonly string[] ) {
			const id = path.at(-1)!

			return this.tag_names()[id] ?? id
		}

		override item_title(id: readonly string[]) {
			return id.at(-1)!
		}

	}
}
