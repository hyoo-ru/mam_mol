namespace $.$$ {
	type Tree = {  [K: string]: Tree } & { __ids?: string[] } 

	function sort_object<Obj extends Record<PropertyKey, any>>(
		obj: Obj,
		sort_tags = $mol_compare_text(),
		sort_items = sort_tags,
	) {
		return Object.keys(obj).sort(sort_tags).reduce((acc, key) => {
			let sub = obj[key]
			
			if (sub instanceof Array) {
				sub = [ ...sub ].sort(sort_items)
			} else if ( sub instanceof Object ) {
				sub = sort_object(sub, sort_tags, sort_items)
			}

			acc[(key as keyof typeof obj)] = sub

			return acc
		}, {} as typeof obj)
	}

	function move_single_id_to_root(tree: Tree, root = tree) {
		for (const key of Object.keys(tree)) {
			if ( key === '__ids' ) continue

			const obj = tree[key]

			if ( ( obj.__ids?.length ?? 0 ) <= 1 ) {
				const id = obj.__ids?.[0]
				
				if (id) {
					root.__ids = root.__ids ?? []
					root.__ids.push(id)
					obj.__ids = undefined
				}

				if (Object.keys(obj).length <= 1) {
					delete tree[key]
					continue
				}
			}

			if ( obj instanceof Object ) move_single_id_to_root(obj, root)
		}

		return tree
	}

	export class $mol_tag_tree extends $.$mol_tag_tree {

		@ $mol_mem_key
		tag_expanded( id: readonly string[], next?: boolean ) {
			return next ?? this.tag_expanded_default(id)
		}

		tag_expanded_default(id: readonly string[]) {
			return this.levels_expanded() >= id.length
		}

		override ids_tags() {
			return {} as Record<string, readonly string[]>
		}

		@ $mol_mem
		override tree() {
			const tree: Tree = { }
			const sep = this.path_sep()
			const ids_tags = this.ids_tags()
			const ids = Object.keys(ids_tags)

			for (const id of ids) {

				const tags = ids_tags[id]

				if (! tags.length) {
					if (! tree.__ids) tree.__ids = []
					tree.__ids.push(id)
				}

				for (const tag of tags) {
					const ptr = tag.split(sep).reduce(
						(ptr, segment) => ptr[segment] = ptr[segment] ?? {},
						tree
					)

					if (! ptr.__ids) ptr.__ids = []
					ptr.__ids.push(id)

				}

			}

			return sort_object(move_single_id_to_root(tree), this.sort_tags(), this.sort_items())
		}

		@ $mol_mem
		override sort_tags() {
			return $mol_compare_text()
		}

		@ $mol_mem
		override sort_items() {
			return this.sort_tags()
		}

		@ $mol_mem
		tree_sub() {
			const path = this.tree_path()

			return path.reduce((ptr, segment) => ptr[segment], this.tree())
		}

		override Tags() {
			const path = this.tree_path()

			return Object.keys( this.tree_sub() )
				.filter(key => key !== '__ids' )
				.map( tag => this.Tag( [ ...path, tag ] ) )
		}

		override Items() {
			const path = this.tree_path()

			return this.tree_sub().__ids?.map( id => this.Item( [ ...path, id ]) ) ?? []
		}

		override tag_names() {
			return {} as Record<string, string>
		}

		override tag_name( tree_path: readonly string[] ) {
			const names = this.tag_names()
			const last_segment = tree_path.at(-1)!

			return names[last_segment] ?? last_segment
		}

		override item_title(id: readonly string[]) {
			return id.at(-1)!
		}

		override tree_path_id(id: readonly string[]) {
			return id ?? []
		}
		
	}
}
