namespace $ { export class $mol_grid_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Grid with large count of cells
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_grid_demo_title" )
	}

	/**
	 *  ```
	 *  rows 1000
	 *  ```
	 **/
	rows() {
		return 1000
	}

	/**
	 *  ```
	 *  cols 10
	 *  ```
	 **/
	cols() {
		return 10
	}

	/**
	 *  ```
	 *  sub / <= Grid
	 *  ```
	 **/
	sub() {
		return [ this.Grid() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Grid $mol_grid
	 *  	records <= records
	 *  	col_head_content!col <= col_head_content!col
	 *  ```
	 **/
	@ $mol_mem
	Grid() {
		return (( obj )=>{
			obj.records = () => this.records()
			obj.col_head_content = ( col : any ) => this.col_head_content(col)
			return obj
		})( new this.$.$mol_grid(  ) )
	}

	/**
	 *  ```
	 *  records *
	 *  ```
	 **/
	records() {
		return ({
		})
	}

	/**
	 *  ```
	 *  col_head_content!col /
	 *  ```
	 **/
	col_head_content( col : any ) {
		return [  ] as readonly any[]
	}

} }

