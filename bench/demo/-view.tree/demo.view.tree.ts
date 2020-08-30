namespace $ {
	export class $mol_bench_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Benchmarking results visualization
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_bench_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= View $mol_bench
		 * 	col_sort?val <=> col_sort?val \mid
		 * 	result <= result *
		 * ```
		 */
		sub() {
			return [
				this.View()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * View $mol_bench
		 * 	col_sort?val <=> col_sort?val \mid
		 * 	result <= result *
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_bench()

			obj.col_sort = (val?: any) => this.col_sort(val)
			obj.result = () => this.result()

			return obj
		}

		/**
		 * ```tree
		 * col_sort?val \mid
		 * ```
		 */
		@ $mol_mem
		col_sort(val?: any) {
			if ( val !== undefined ) return val
			return "mid"
		}

		/**
		 * ```tree
		 * result *
		 * ```
		 */
		result() {
			return {

			}
		}
	}

}
