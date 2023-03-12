namespace $.$$ {
	type Tree = {  [K: string]: Tree } & { __ids?: string[] } 

	export class $mol_tag_tree extends $.$mol_tag_tree {

		// @ $mol_mem_key
		// tag_expanded( id: string, next?: boolean ) {
		// 	if (next === undefined) return this.tag_current() === id

		// 	return this.tag_current(next ? id : '') === id
		// }

		override tree_path(next?: readonly string[]) {
			return next ?? []
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

			ids.forEach(id => {

				let tags = ids_tags[id]
				if (! tags.length) tags = [ 'untagged' ]

				tags.forEach(tag => {
					let ptr = tree

					tag.split(sep).forEach(segment => {

						if (! ptr[segment]) ptr[segment] = { }
						ptr = ptr[segment]

					})

					if (! ptr.__ids) ptr.__ids = []
					ptr.__ids.push(id)

				})

			})

			return tree
		}

		@ $mol_mem
		tree_sub() {
			const path = this.tree_path()

			return path.reduce((ptr, segment) => ptr[segment], this.tree())
		}

		@ $mol_mem
		override sub() {
			const path = this.tree_path()
			const last_segment = path[ path.length - 1 ]

			if (last_segment === 'untagged') return [ this.Untagged() ]

			return super.sub()
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
			const last_segment = tree_path[tree_path.length - 1]

			return names[last_segment] ?? last_segment
		}

		override item_title(id: readonly string[]) {
			return id[id.length - 1]
		}

		override tree_path_id(id: readonly string[]) {
			return id ?? []
		}
		
	}
}
