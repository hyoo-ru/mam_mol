namespace $ {
	export class $mol_perf_uibench extends $mol_scroll {

		/**
		 * ```tree
		 * attr_static *
		 * 	^
		 * 	class \Main
		 * ```
		 */
		attr_static() {
			return {
				...super.attr_static(),
				class: "Main"
			}
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Table
		 * 	<= Anim
		 * 	<= Tree
		 * ```
		 */
		sub() {
			return [
				this.Table(),
				this.Anim(),
				this.Tree()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * table_state null
		 * ```
		 */
		table_state() {
			return null as any
		}

		/**
		 * ```tree
		 * Table $mol_perf_uibench_table state <= table_state
		 * ```
		 */
		@ $mol_mem
		Table() {
			const obj = new this.$.$mol_perf_uibench_table()

			obj.state = () => this.table_state()

			return obj
		}

		/**
		 * ```tree
		 * anim_state null
		 * ```
		 */
		anim_state() {
			return null as any
		}

		/**
		 * ```tree
		 * Anim $mol_perf_uibench_anim state <= anim_state
		 * ```
		 */
		@ $mol_mem
		Anim() {
			const obj = new this.$.$mol_perf_uibench_anim()

			obj.state = () => this.anim_state()

			return obj
		}

		/**
		 * ```tree
		 * tree_state null
		 * ```
		 */
		tree_state() {
			return null as any
		}

		/**
		 * ```tree
		 * Tree $mol_perf_uibench_tree state <= tree_state
		 * ```
		 */
		@ $mol_mem
		Tree() {
			const obj = new this.$.$mol_perf_uibench_tree()

			obj.state = () => this.tree_state()

			return obj
		}
	}

}
