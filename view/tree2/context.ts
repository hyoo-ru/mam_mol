namespace $ {
	export type $mol_view_tree2_locales = Record<string, string>

	export class $mol_view_tree2_context extends $mol_object2 {

		protected prefixes_key: string | undefined

		constructor(
			$: $mol_ambient_context,
			protected prefixes: readonly $mol_tree2[],
			protected locales: $mol_view_tree2_locales,
			protected methods: $mol_tree2[],
			protected no_locale = false,
			protected added_nodes = new Map<string, $mol_tree2>()
		) {
			super()
			this.$ = $
			this.prefixes_key = prefixes.map(p => p.value).join('') + '_'
		}

		clone(prefixes: readonly $mol_tree2[], no_locale = this.no_locale) {
			return new this.$.$mol_view_tree2_context(this.$, prefixes, this.locales, this.methods, no_locale, this.added_nodes)
		}

		prefix_add(prefix: $mol_tree2) {
			const prefixes = this.prefixes.slice()
			prefixes.push(
				prefix.data('_'),
				prefix,
			)

			return this.clone(prefixes)
		}

		prefix_root() {
			return this.clone(this.prefixes.slice(0, 1), false)
		}

		locale_disable() {
			return this.clone(this.prefixes, true)
		}

		get_owner(owner: $mol_tree2) {
			const prev = this.added_nodes.get(owner.type)

			if (prev) {
				if ( prev.toString() !== owner.toString() ) return this.$.$mol_fail(owner.error(
					`Property already defined with another default value in ${prev.span}\n---`
				))

				return prev
			}
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

		locale_call(owner_name: $mol_tree2, operator: $mol_tree2) {
			const key = this.prefixes_key + owner_name.value

			const val = operator.kids.length === 1 ? operator.kids[0] : undefined

			if (! val) return this.$.$mol_fail(operator.error(
				'Need a one child, use `some @ \\localized value`'
			))

			if (this.no_locale) return this.$.$mol_fail(operator.error(
				'Can\'t use `@` operator inside array subtree'
			))

			const prev = this.locale_nodes.get(key)

			if (prev) return this.$.$mol_fail(operator.error(
				`Locale key \`${key}\` conflicts with same at ${prev.span}`
			))

			this.locale_nodes.set(key, val)

			this.locales[key] = val.value

			return owner_name.struct('inline', [
				operator.data('this.$.$mol_locale.text( \''),
				...this.prefixes,
				owner_name.data('_'),
				owner_name,
				operator.data('\' )'),	
			])
		}
	}
}
