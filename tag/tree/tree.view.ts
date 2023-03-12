namespace $.$$ {
	type Tree = {  [K: string]: Tree } & { __ids?: string[] } 

	export class $mol_tag_tree extends $.$mol_tag_tree {

		// @ $mol_mem_key
		// tag_expanded( id: string, next?: boolean ) {
		// 	if (next === undefined) return this.tag_current() === id

		// 	return this.tag_current(next ? id : '') === id
		// }

		override tree_path(next?: string) {
			return next ?? ''
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

			if (! path) return this.tree()

			const segments = path.split(this.path_sep())

			return segments.reduce((ptr, segment) => ptr[segment], this.tree())
		}

		@ $mol_mem
		override sub() {
			const tree = this.tree_sub()
			const path = this.tree_path()
			const prefix = path ? (path + this.path_sep()) : ''

			return [
				... Object.keys( tree )
					.filter(key => key !== '__ids')
					.map( tag => this.Tag( prefix + tag ) ),

				... tree.__ids?.map( id => this.Item( prefix + id ) ) ?? [],
			]
		}

		override tag_names() {
			return {} as Record<string, string>
		}
		
		override tag_name( tag: string ) {
			const names = this.tag_names()
			const localize_id = tag.substring(tag.lastIndexOf(this.path_sep()) + 1)

			return names[localize_id] ?? localize_id
		}

		override item_title(id: string) {
			return id
		}

		override tree_path_fix(id: string) {
			return id ?? ''
		}
		
	}
}
