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
	 *  sub / <= Grid
	 *  ```
	 **/
	sub() {
		return [].concat( this.Grid() )
	}

	/**
	 *  ```
	 *  Grid $mol_grid
	 *  	row_height 40
	 *  	records <= records
	 *  	col_head_content!col <= col_head_content!col
	 *  ```
	 **/
	@ $mol_mem
	Grid() {
		return (( obj )=>{
			obj.row_height = () => 40
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
		return [].concat(  )
	}

} }

