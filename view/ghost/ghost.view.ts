namespace $.$mol {
	export class $mol_view_ghost extends $.$mol_view_ghost {
		dom_node(next?: Element) {
			let next2 = this[ 'dom_node()' ]
			if( next2 ) return next2
			const node = this.Sub().dom_node();
			$mol_view.bind_event(node, this.event());
			this['dom_node()'] = node;
			return node;
		}
		
		dom_tree() {
			super.dom_tree();
			return this.Sub().dom_tree();
		}
	}
}
