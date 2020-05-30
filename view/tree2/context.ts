namespace $ {
	export type $mol_view_tree2_locales = Record<string, string>

	export class $mol_view_tree2_context extends $mol_object2 {

		protected added_nodes = new Map<string, $mol_tree2>()

		protected prefix: $mol_tree2

		constructor(
			$: $mol_ambient_context,
			class_node: $mol_tree2,
			protected locales: $mol_view_tree2_locales,
			protected methods: $mol_tree2[]
		) {
			super()
			this.$ = $
			this.prefix = class_node.data(class_node.type)
		}

		has_owner(owner: $mol_tree2) {
			const prev = this.added_nodes.get(owner.type)
			if (prev) {
				if( prev.toString() !== owner.toString() ) return this.$.$mol_fail(
					owner.error( 'Property already defined with another default value' + prev.error('').message + '\n---' )
				)

				return true
			}

			return false
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

		locale_call(owner_name: $mol_tree2, operator: $mol_tree2) {
			const key = `${this.prefix.data}_${owner_name.data}`

			this.locales[key] = operator.value

			return owner_name.struct('inline', [
				operator.data('this.$.$mol_locale.text( \''),
				this.prefix,
				owner_name.data('_'),
				owner_name,
				operator.data('\' )'),	
			])
		}
	}
}
