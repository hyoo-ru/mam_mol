namespace $.$$ {
	export class $mol_plot_base extends $.$mol_plot_base {
		dimensions() {
			return [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			] as const
		}

		viewport() {
			const size = this.size_real()
			return [[0, size[0]], [0, size[1]]] as const
		}
	}
}
