namespace $ {
	export type $mol_view_tree_ts_locales = Record<string, string>

	export class $mol_view_tree_ts_context {

		protected added_nodes = new Map<string, $mol_tree>()

		protected prefix: $mol_tree

		constructor(
			class_node: $mol_tree,
			protected locales: $mol_view_tree_ts_locales,
			protected methods: $mol_tree[]
		) {
			this.prefix = class_node.make_data(class_node.type)
		}

		has_owner(owner: $mol_tree) {
			const prev = this.added_nodes.get(owner.type)
			if (prev) {
				if( prev.toString() !== owner.toString() ) {
					throw owner.error( 'Property already defined with another default value' + prev.error('').message + '\n---' )
				}
				return true
			}

			return false
		}

		index(owner: $mol_tree) {
			this.added_nodes.set(owner.type, owner)

			const index = this.methods.length
			this.methods.push(undefined!)

			return index
		}

		method(index: number, method: $mol_tree) {
			this.methods[index] = method
		}

		locale_call(owner_name: $mol_tree, operator: $mol_tree) {
			const key = `${this.prefix.data}_${owner_name.data}`

			this.locales[key] = operator.value

			return owner_name.make_struct('inline', [
				operator.make_data('this.$.$mol_locale.text( \''),
				this.prefix,
				owner_name.make_data('_'),
				owner_name,
				operator.make_data('\' )'),	
			])
		}
	}
}
