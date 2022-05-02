namespace $ {
	export class $mol_perf_uibench_tree extends $mol_view {
		
		/**
		 * ```tree
		 * state null
		 * ```
		 */
		state() {
			return null as any
		}
		
		/**
		 * ```tree
		 * attr_static *
		 * 	^
		 * 	class \Tree
		 * ```
		 */
		attr_static() {
			return {
				...super.attr_static(),
				class: "Tree"
			}
		}
		
		/**
		 * ```tree
		 * sub / <= Root
		 * ```
		 */
		sub() {
			return [
				this.Root()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * root_state null
		 * ```
		 */
		root_state() {
			return null as any
		}
		
		/**
		 * ```tree
		 * Root $mol_perf_uibench_tree_branch state <= root_state
		 * ```
		 */
		@ $mol_mem
		Root() {
			const obj = new this.$.$mol_perf_uibench_tree_branch()
			
			obj.state = () => this.root_state()
			
			return obj
		}
	}
	
	export class $mol_perf_uibench_tree_branch extends $mol_list {
		
		/**
		 * ```tree
		 * state null
		 * ```
		 */
		state() {
			return null as any
		}
		
		/**
		 * ```tree
		 * dom_name \ul
		 * ```
		 */
		dom_name() {
			return "ul"
		}
		
		/**
		 * ```tree
		 * attr_static *
		 * 	^
		 * 	class \TreeNode
		 * ```
		 */
		attr_static() {
			return {
				...super.attr_static(),
				class: "TreeNode"
			}
		}
		
		/**
		 * ```tree
		 * Branch* $mol_perf_uibench_tree_branch state <= branch_state*
		 * ```
		 */
		@ $mol_mem_key
		Branch(id: any) {
			const obj = new this.$.$mol_perf_uibench_tree_branch()
			
			obj.state = () => this.branch_state(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Leaf* $mol_perf_uibench_tree_leaf text <= leaf_state*
		 * ```
		 */
		@ $mol_mem_key
		Leaf(id: any) {
			const obj = new this.$.$mol_perf_uibench_tree_leaf()
			
			obj.text = () => this.leaf_state(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * branch_state* null
		 * ```
		 */
		branch_state(id: any) {
			return null as any
		}
		
		/**
		 * ```tree
		 * leaf_state* null
		 * ```
		 */
		leaf_state(id: any) {
			return null as any
		}
	}
	
	export class $mol_perf_uibench_tree_leaf extends $mol_view {
		
		/**
		 * ```tree
		 * minimal_height 26
		 * ```
		 */
		minimal_height() {
			return 26
		}
		
		/**
		 * ```tree
		 * dom_name \li
		 * ```
		 */
		dom_name() {
			return "li"
		}
		
		/**
		 * ```tree
		 * attr_static *
		 * 	^
		 * 	class \TreeLeaf
		 * ```
		 */
		attr_static() {
			return {
				...super.attr_static(),
				class: "TreeLeaf"
			}
		}
		
		/**
		 * ```tree
		 * sub / <= text
		 * ```
		 */
		sub() {
			return [
				this.text()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * text \
		 * ```
		 */
		text() {
			return ""
		}
	}
	
}

