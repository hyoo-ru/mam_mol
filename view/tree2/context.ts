namespace $ {
	export type $mol_view_tree2_locales = Record<string, string>

	const err = $mol_view_tree2_error_str

	export class $mol_view_tree2_context extends $mol_object2 {
		constructor(
			$: $mol_ambient_context,
			protected parents: readonly $mol_view_tree2_prop[],
			protected locales: $mol_view_tree2_locales,
			protected methods: $mol_tree2[],
			protected added_nodes = new Map<string, $mol_tree2>(),
			protected array?: $mol_tree2,
		) {
			super()
			this.$ = $
		}

		protected clone(prefixes: readonly $mol_view_tree2_prop[], array?: $mol_tree2) {
			return new this.$.$mol_view_tree2_context(
				this.$,
				prefixes,
				this.locales,
				this.methods,
				this.added_nodes,
				array
			)
		}

		parent(prefix: $mol_view_tree2_prop) {
			const parents = this.parents.slice()
			parents.push(prefix)

			return this.clone(parents, this.array)
		}

		root() {
			return this.clone(this.parents.slice(0, 1))
		}

		locale_disable(array: $mol_tree2) {
			if (this.array) return this

			return this.clone(this.parents, array)
		}

		get_owner(owner: $mol_tree2) {
			const prev = this.added_nodes.get(owner.type)

			if (prev) {
				if ( prev.toString() !== owner.toString() ) return this.$.$mol_fail(
					err`Can't define property at ${owner.span}, already defined with another default value in ${prev.span}`
				)

				return prev
			}
		}

		check_scope_vars(key: $mol_tree2 | undefined, next?: $mol_tree2) {
			let finded_key: $mol_tree2 | undefined
			let finded_next: $mol_tree2 | undefined

			for (const parent of this.parents) {
				if (key && key.value === parent.key?.value) finded_key = parent.key
				if (next && next.value === parent.next?.value) finded_next = parent.next
			}

			if (key && ! finded_key) return this.$.$mol_fail(
				err`Key at ${key.span} not found at ${this.parents.map(parent => parent.src.span)}`
			)

			if (next && ! finded_next) return this.$.$mol_fail(
				err`Next at ${next.span} not found at ${this.parents.map(parent => parent.src.span)}`
			)
		}

		index(owner: $mol_tree2) {
			this.added_nodes.set(owner.type, owner)

			const index = this.methods.length
			this.methods.push(undefined!)

			return index
		}

		method(index: number, method: $mol_tree2) {
			this.methods[index] = method
		}

		protected locale_nodes = new Map<string, $mol_tree2>()

		locale(operator: $mol_tree2) {
			const parents = this.parents
			const val = operator.kids.length === 1 ? operator.kids[0] : undefined

			if (! val) return this.$.$mol_fail(
				err`Need a one child at ${operator.span}, use \`some @ \\localized value\``
			)

			if (this.array) return this.$.$mol_fail(
				err`Can\'t use \`@\` at ${operator.span} inside array at ${this.array.span}`
			)

			let key = ''

			const body: $mol_tree2[] = [
				operator.data('this.$.$mol_locale.text( \'')
			]

			const last = parents.length > 0 ? parents[parents.length - 1] : undefined

			for (const parent of parents) {
				body.push(parent.name)
				key += parent.name.value
				if (parent === last) break
				body.push(parent.name.data('_'))
				key += '_'
			}

			body.push(operator.data('\' )'))

			const prev = this.locale_nodes.get(key)

			if (prev) return this.$.$mol_fail(
				err`Locale key \`${key}\` at ${operator.span} conflicts with same at ${prev.span}`
			)

			this.locale_nodes.set(key, val)

			this.locales[key] = val.value

			return $mol_tree2.struct('inline', body)
		}
	}
}
