namespace $ { export class $mol_plot_ruler_hor extends $mol_plot_ruler {

	/**
	 *  ```
	 *  title_align \start
	 *  ```
	 **/
	title_align() {
		return "start"
	}

	/**
	 *  ```
	 *  label_align \middle
	 *  ```
	 **/
	label_align() {
		return "middle"
	}

	/**
	 *  ```
	 *  title_pos_x \0
	 *  ```
	 **/
	title_pos_x() {
		return "0"
	}

	/**
	 *  ```
	 *  title_pos_y \100%
	 *  ```
	 **/
	title_pos_y() {
		return "100%"
	}

	/**
	 *  ```
	 *  label_pos_y!v <= title_pos_y
	 *  ```
	 **/
	label_pos_y( v : any ) {
		return this.title_pos_y()
	}

	/**
	 *  ```
	 *  background_width \100%
	 *  ```
	 **/
	background_width() {
		return "100%"
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/plot/ruler/hor/-view.tree/hor.view.tree.map