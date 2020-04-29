namespace $ { export class $mol_list extends $mol_view {

	/**
	 *  ```
	 *  render_visible_only true
	 *  ```
	 **/
	render_visible_only() {
		return true
	}

	/**
	 *  ```
	 *  render_over 0
	 *  ```
	 **/
	render_over() {
		return 0
	}

	/**
	 *  ```
	 *  sub <= rows
	 *  ```
	 **/
	sub() {
		return this.rows()
	}

	/**
	 *  ```
	 *  rows /$mol_view
	 *  ```
	 **/
	rows() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  Empty $mol_view
	 *  ```
	 **/
	@ $mol_mem
	Empty() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Gap_before $mol_view style * paddingTop <= gap_before
	 *  ```
	 **/
	@ $mol_mem
	Gap_before() {
		return (( obj )=>{
			obj.style = () => ({
			"paddingTop" :  this.gap_before() ,
		})
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  gap_before 0
	 *  ```
	 **/
	gap_before() {
		return 0
	}

	/**
	 *  ```
	 *  Gap_after $mol_view style * paddingTop <= gap_after
	 *  ```
	 **/
	@ $mol_mem
	Gap_after() {
		return (( obj )=>{
			obj.style = () => ({
			"paddingTop" :  this.gap_after() ,
		})
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  gap_after 0
	 *  ```
	 **/
	gap_after() {
		return 0
	}

	/**
	 *  ```
	 *  view_window /
	 *  	0
	 *  	0
	 *  ```
	 **/
	view_window() {
		return [0 , 0] as readonly any[]
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/list/-view.tree/list.view.tree.map