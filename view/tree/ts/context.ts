namespace $ {
	export class $mol_view_tree_ts_context {

		protected added_nodes = new Map<string, $mol_tree>()

		protected prefix: $mol_tree

		constructor(
			root_class: $mol_tree,
			readonly locales: Record<string, string>,
			readonly methods: $mol_tree[] = [],
			protected depth = 0
		) {
			this.prefix= root_class.make_data(root_class.type)
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

		set_owner(owner: $mol_tree, method: $mol_tree) {
			this.added_nodes.set(owner.type, owner)
			this.methods.push(method)
		}

		locale_call(owner_name: $mol_tree, operator: $mol_tree) {
			const key = `${this.prefix.data}_${owner_name.data}`

			this.locales[key] = operator.value

			return owner_name.make_struct('inline', [
				operator.make_data('this.$.$mol_locale.text( \''),
				this.prefix,
				owner_name.make({ data: '_' }),
				owner_name,
				operator.make_data('\' )'),	
			])
		}
	}
}
