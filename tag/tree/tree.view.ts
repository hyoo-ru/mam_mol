namespace $.$$ {
	type Tree = {  [K: string]: Tree } & { __ids?: string[] } 


	function defaultSortFn(a: string, b: string) {
		if ( a > b || a === 'untagged' ) return 1
		if ( a < b || b === 'untagged' ) return -1

		return 0
	}

	function sort_object<Obj extends Record<PropertyKey, any>>(
		obj: Obj,
		sortFn = defaultSortFn
	) {
		return Object.keys(obj).sort(sortFn).reduce((acc, key) => {
			let sub = obj[key]

			if (sub instanceof Array) {
				sub = [ ...sub ].sort(sortFn)
			} else if ( sub instanceof Object ) {
				sub = sort_object(sub, sortFn)
			}

			acc[(key as keyof typeof obj)] = sub

			return acc
		}, {} as typeof obj)
	}

	export class $mol_tag_tree extends $.$mol_tag_tree {

		// @ $mol_mem_key
		// tag_expanded( id: string, next?: boolean ) {
		// 	if (next === undefined) return this.tag_current() === id

		// 	return this.tag_current(next ? id : '') === id
		// }

		override ids_tags() {
			return {} as Record<string, readonly string[]>
		}

		@ $mol_mem
		override tree() {
			const tree: Tree = { }
			const sep = this.path_sep()
			const ids_tags = this.ids_tags()
			const ids = Object.keys(ids_tags)

			ids.forEach(id => {

				let tags = ids_tags[id]
				if (! tags.length) tags = [ 'untagged' ]

				tags.forEach(tag => {
					const ptr = tag.split(sep).reduce(
						(ptr, segment) => ptr[segment] = ptr[segment] ?? {},
						tree
					)

					if (! ptr.__ids) ptr.__ids = []
					ptr.__ids.push(id)

				})

			})

			const norm = sort_object(tree)

			return norm
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
