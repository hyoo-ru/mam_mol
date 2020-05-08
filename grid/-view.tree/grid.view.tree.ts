namespace $ { export class $mol_grid extends $mol_scroll {

	/**
	 *  ```
	 *  row_height 40
	 *  ```
	 **/
	row_height() {
		return 40
	}

	/**
	 *  ```
	 *  row_ids /string[]
	 *  ```
	 **/
	row_ids() {
		return [] as readonly ( string[] )[]
	}

	/**
	 *  ```
	 *  row_id!index null
	 *  ```
	 **/
	row_id( index : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  col_ids /
	 *  ```
	 **/
	col_ids() {
		return [] as readonly any[]
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
	 *  record!id null
	 *  ```
	 **/
	record( id : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  hierarchy null
	 *  ```
	 **/
	hierarchy() {
		return null as any
	}

	/**
	 *  ```
	 *  hierarchy_col \
	 *  ```
	 **/
	hierarchy_col() {
		return ""
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Head
	 *  	<= Table
	 *  ```
	 **/
	sub() {
		return [this.Head() , this.Table()] as readonly any[]
	}

	/**
	 *  ```
	 *  Table $mol_grid_table sub <= rows
	 *  ```
	 **/
	@ $mol_mem
	Table() {
		return (( obj )=>{
			obj.sub = () => this.rows()
			return obj
		})( new this.$.$mol_grid_table(  ) )
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
	 *  Head $mol_grid_row cells <= head_cells
	 *  ```
	 **/
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.cells = () => this.head_cells()
			return obj
		})( new this.$.$mol_grid_row(  ) )
	}

	/**
	 *  ```
	 *  head_cells /$mol_view
	 *  ```
	 **/
	head_cells() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  Row!id $mol_grid_row
	 *  	minimal_height <= row_height
	 *  	cells <= cells!id
	 *  ```
	 **/
	@ $mol_mem_key
	Row( id : any ) {
		return (( obj )=>{
			obj.minimal_height = () => this.row_height()
			obj.cells = () => this.cells(id)
			return obj
		})( new this.$.$mol_grid_row(  ) )
	}

	/**
	 *  ```
	 *  cells!id /$mol_view
	 *  ```
	 **/
	cells( id : any ) {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  Cell!id $mol_view
	 *  ```
	 **/
	@ $mol_mem_key
	Cell( id : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  cell!id null
	 *  ```
	 **/
	cell( id : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  Cell_text!id $mol_grid_cell sub <= cell_content_text!id
	 *  ```
	 **/
	@ $mol_mem_key
	Cell_text( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.cell_content_text(id)
			return obj
		})( new this.$.$mol_grid_cell(  ) )
	}

	/**
	 *  ```
	 *  cell_content_text!id <= cell_content!id
	 *  ```
	 **/
	cell_content_text( id : any ) {
		return this.cell_content(id)
	}

	/**
	 *  ```
	 *  cell_content!id /$mol_view_content
	 *  ```
	 **/
	cell_content( id : any ) {
		return [] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  Cell_number!id $mol_grid_number sub <= cell_content_number!id
	 *  ```
	 **/
	@ $mol_mem_key
	Cell_number( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.cell_content_number(id)
			return obj
		})( new this.$.$mol_grid_number(  ) )
	}

	/**
	 *  ```
	 *  cell_content_number!id <= cell_content!id
	 *  ```
	 **/
	cell_content_number( id : any ) {
		return this.cell_content(id)
	}

	/**
	 *  ```
	 *  Col_head!id $mol_float
	 *  	dom_name \th
	 *  	sub <= col_head_content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Col_head( id : any ) {
		return (( obj )=>{
			obj.dom_name = () => "th"
			obj.sub = () => this.col_head_content(id)
			return obj
		})( new this.$.$mol_float(  ) )
	}

	/**
	 *  ```
	 *  col_head_content!id /$mol_view_content
	 *  ```
	 **/
	col_head_content( id : any ) {
		return [] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  Cell_branch!id $mol_check_expand
	 *  	level <= cell_level!id
	 *  	label <= cell_content!id
	 *  	expanded?val <=> cell_expanded!id?val
	 *  ```
	 **/
	@ $mol_mem_key
	Cell_branch( id : any ) {
		return (( obj )=>{
			obj.level = () => this.cell_level(id)
			obj.label = () => this.cell_content(id)
			obj.expanded = ( val? : any ) => this.cell_expanded(id , val )
			return obj
		})( new this.$.$mol_check_expand(  ) )
	}

	/**
	 *  ```
	 *  cell_level!id 0
	 *  ```
	 **/
	cell_level( id : any ) {
		return 0
	}

	/**
	 *  ```
	 *  cell_expanded!id?val false
	 *  ```
	 **/
	@ $mol_mem_key
	cell_expanded( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Cell_content!id / <= Cell_dimmer!id
	 *  ```
	 **/
	Cell_content( id : any ) {
		return [this.Cell_dimmer(id)] as readonly any[]
	}

	/**
	 *  ```
	 *  Cell_dimmer!id $mol_dimmer
	 *  	needle <= needle
	 *  	haystack <= cell_value!id
	 *  ```
	 **/
	@ $mol_mem_key
	Cell_dimmer( id : any ) {
		return (( obj )=>{
			obj.needle = () => this.needle()
			obj.haystack = () => this.cell_value(id)
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  needle \
	 *  ```
	 **/
	needle() {
		return ""
	}

	/**
	 *  ```
	 *  cell_value!id \
	 *  ```
	 **/
	cell_value( id : any ) {
		return ""
	}

} }
namespace $ { export class $mol_grid_table extends $mol_list {

	/**
	 *  ```
	 *  dom_name \table
	 *  ```
	 **/
	dom_name() {
		return "table"
	}

} }
namespace $ { export class $mol_grid_row extends $mol_view {

	/**
	 *  ```
	 *  dom_name \tr
	 *  ```
	 **/
	dom_name() {
		return "tr"
	}

	/**
	 *  ```
	 *  sub <= cells
	 *  ```
	 **/
	sub() {
		return this.cells()
	}

	/**
	 *  ```
	 *  cells /$mol_view
	 *  ```
	 **/
	cells() {
		return [] as readonly ( $mol_view )[]
	}

} }
namespace $ { export class $mol_grid_cell extends $mol_view {

	/**
	 *  ```
	 *  dom_name \td
	 *  ```
	 **/
	dom_name() {
		return "td"
	}

	/**
	 *  ```
	 *  minimal_height 40
	 *  ```
	 **/
	minimal_height() {
		return 40
	}

} }
namespace $ { export class $mol_grid_number extends $mol_grid_cell {

} }
