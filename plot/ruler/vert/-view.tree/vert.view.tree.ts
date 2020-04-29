namespace $ { export class $mol_plot_ruler_vert extends $mol_plot_ruler {

	/**
	 *  ```
	 *  title_align \end
	 *  ```
	 **/
	title_align() {
		return "end"
	}

	/**
	 *  ```
	 *  label_align \end
	 *  ```
	 **/
	label_align() {
		return "end"
	}

	/**
	 *  ```
	 *  title_pos_y \14
	 *  ```
	 **/
	title_pos_y() {
		return "14"
	}

	/**
	 *  ```
	 *  label_pos_x!v <= title_pos_x
	 *  ```
	 **/
	label_pos_x( v : any ) {
		return this.title_pos_x()
	}

	/**
	 *  ```
	 *  background_height \100%
	 *  ```
	 **/
	background_height() {
		return "100%"
	}

	/**
	 *  ```
	 *  background_width <= title_pos_x
	 *  ```
	 **/
	background_width() {
		return this.title_pos_x()
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/plot/ruler/vert/-view.tree/vert.view.tree.map