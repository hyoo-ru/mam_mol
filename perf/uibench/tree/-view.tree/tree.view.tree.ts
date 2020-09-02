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
		 * Branch!index $mol_perf_uibench_tree_branch state <= branch_state!index
		 * ```
		 */
		@ $mol_mem_key
		Branch(index: any) {
			const obj = new this.$.$mol_perf_uibench_tree_branch()

			obj.state = () => this.branch_state(index)

			return obj
		}

		/**
		 * ```tree
		 * Leaf!index $mol_perf_uibench_tree_leaf text <= leaf_state!index
		 * ```
		 */
		@ $mol_mem_key
		Leaf(index: any) {
			const obj = new this.$.$mol_perf_uibench_tree_leaf()

			obj.text = () => this.leaf_state(index)

			return obj
		}

		/**
		 * ```tree
		 * branch_state!index null
		 * ```
		 */
		branch_state(index: any) {
			return null as any
		}

		/**
		 * ```tree
		 * leaf_state!index null
		 * ```
		 */
		leaf_state(index: any) {
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
