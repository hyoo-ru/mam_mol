namespace $ {

	export function $mol_view_tree_ts_transform(tree: $mol_tree) {
		return tree.hack({
			'-': comment_hack,
			'': class_hack
		})!
	}

	function comment_hack( input : $mol_tree , context : $mol_tree_context ): readonly $mol_tree[] {
		return [ input.clone({ type: '//' }) ]
	}

	function class_hack( input : $mol_tree , tree_context : $mol_tree_context ): readonly $mol_tree[] {
		if( !/^\$\w+$/.test( input.type ) ) throw input.error( 'Wrong component name' )

		const collector = new property_collector(tree_context)

		input.hack({
			'': collector.property_visitor
		})

		return collector.all()
	}

	class property_collector {
		protected props = new Map<string, $mol_tree>()

		constructor(protected parent_context: $mol_tree_context) {}

		all() {
			return Array.from(this.props.values())
		}

		add(next: $mol_tree) {
			const type = next.type
			const prev = this.props.get(type)

			if ( ! prev) {
				this.props.set(next.type, next)
				return
			}

			this.assert_defined(prev, next)
		}

		assert_defined(prev: $mol_tree, next: $mol_tree) {
			if( prev.toString() !== next.toString() ) {
				throw next.error( 'Property already defined with another default value' + prev.error('').message + '\n---' )
			}
		}

		property_visitor = (input : $mol_tree , tree_context : $mol_tree_context ): readonly $mol_tree[] => {
			input.hack({
				'': this.skip_visitor.bind(this),
				'<=': this.left_visitor.bind(this),
				'<=>': this.both_visitor.bind(this),
				'=>': this.right_visitor.bind(this)
			})
	
			return []
		}

		skip_visitor(input : $mol_tree , context : $mol_tree_context ): readonly $mol_tree[] {
			return [ ]
		}

		left_visitor(input : $mol_tree , context : $mol_tree_context ): readonly $mol_tree[] {
			this.add(input)
			input.hack(context)
			return [ ]
		}

		both_visitor(input : $mol_tree , context : $mol_tree_context ): readonly $mol_tree[] {
			this.add(input)
			input.hack(context)
			return [ ]
		}

		right_visitor(input : $mol_tree , context : $mol_tree_context ): readonly $mol_tree[] {
			this.add(input)
			input.hack(context)
			return [ ]
		}

	}
}
