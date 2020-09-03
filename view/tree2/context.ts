namespace $ {
	export type $mol_view_tree2_locales = Record<string, string>

	const err = $mol_view_tree2_error_str

	export class $mol_view_tree2_context extends $mol_object2 {
		constructor(
			$: $mol_ambient_context,
			protected parents: readonly $mol_view_tree2_prop[],
			protected locales: $mol_view_tree2_locales,
			protected methods: $mol_tree2[],
			readonly types = true,
			protected added_nodes = new Map<string, $mol_view_tree2_prop>(),
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
				this.types,
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

		get_method({ name, src, key, next }: $mol_view_tree2_prop) {
			const prev = this.added_nodes.get(name.value)
			if (! prev) return

			if ((prev.key && !key) || (!prev.key && key) || (prev.next && !next) || (!prev.next && next)) return this.$.$mol_fail(
				err`Method ${src.type} at ${src.span} is not same as ${prev.src.type} at ${prev.src.span}`
			)

			const current_default = src.kids.length > 0 ? src.kids[0] : undefined
			const prev_default = prev.src.kids.length > 0 ? prev.src.kids[0] : undefined

			if (current_default?.type === '-' ) return prev

			if ( prev_default?.toString() !== current_default?.toString() ) return this.$.$mol_fail(
				err`Method ${name.value} at ${
					current_default?.span ?? name.span
				} already defined with another default value at ${prev_default?.span ?? prev.name.span}`
			)

			return prev
		}

		check_scope_vars({name, key, next}: $mol_view_tree2_prop) {
			let finded_key: $mol_tree2 | undefined
			let finded_next: $mol_tree2 | undefined

			const parents = this.parents
			for (let i = 1 ; i < parents.length; i++) {
				const parent = parents[i]
				if (key && key.value === parent.key?.value) finded_key = parent.key
				if (next && next.value === parent.next?.value) finded_next = parent.next
			}

			if (key && ! finded_key) return this.$.$mol_fail(
				err`Key ${key.value} at ${key.span} not found at ${this.parents.map(parent => parent.src.span)}`
			)

			if (next && ! finded_next) return this.$.$mol_fail(
				err`Next ${next.value} at ${next.span} not found at ${this.parents.map(parent => parent.src.span)}`
			)

			const first_method = parents.length > 1 ? parents[1] : undefined

			if (name.value === first_method?.name.value) return this.$.$mol_fail(
				err`Method ${name.value} at ${name.span} already defined at ${first_method.name.span}`
			)
		}

		index(owner: $mol_view_tree2_prop) {
			this.added_nodes.set(owner.name.value, owner)

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

			const body: $mol_tree2[] = []

			const last = parents.length > 0 ? parents[parents.length - 1] : undefined

			for (const parent of parents) {
				body.push(parent.name)
				key += parent.name.value
				if (parent === last) break
				body.push(parent.name.data('_'))
				key += '_'
			}

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
