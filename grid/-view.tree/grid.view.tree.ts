namespace $ { export class $mol_grid extends $mol_scroll {

	/**
	 *  ```
	 *  row_ids /
	 *  ```
	 **/
	row_ids() {
		return [].concat(  )
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
		return [].concat(  )
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
	 *  sub / <= Table
	 *  ```
	 **/
	sub() {
		return [].concat( this.Table() )
	}

	/**
	 *  ```
	 *  Table $mol_grid_table
	 *  	offset <= gap_top
	 *  	sub / <= rows_visible
	 *  ```
	 **/
	@ $mol_mem
	Table() {
		return (( obj )=>{
			obj.offset = () => this.gap_top()
			obj.sub = () => [].concat( this.rows_visible() )
			return obj
		})( new this.$.$mol_grid_table(  ) )
	}

	/**
	 *  ```
	 *  gap_top 0
	 *  ```
	 **/
	gap_top() {
		return 0
	}

	/**
	 *  ```
	 *  rows_visible /
	 *  ```
	 **/
	rows_visible() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  rows /
	 *  ```
	 **/
	rows() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Head $mol_grid_row
	 *  	height <= row_height
	 *  	cells <= head_cells
	 *  ```
	 **/
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.height = () => this.row_height()
			obj.cells = () => this.head_cells()
			return obj
		})( new this.$.$mol_grid_row(  ) )
	}

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
	 *  head_cells /
	 *  ```
	 **/
	head_cells() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Row!id $mol_grid_row
	 *  	height <= row_height
	 *  	cells <= cells!id
	 *  ```
	 **/
	@ $mol_mem_key
	Row( id : any ) {
		return (( obj )=>{
			obj.height = () => this.row_height()
			obj.cells = () => this.cells(id)
			return obj
		})( new this.$.$mol_grid_row(  ) )
	}

	/**
	 *  ```
	 *  cells!id /
	 *  ```
	 **/
	cells( id : any ) {
		return [].concat(  )
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
	 *  Cell_text!id $mol_grid_cell sub / <= cell_content_text!id
	 *  ```
	 **/
	@ $mol_mem_key
	Cell_text( id : any ) {
		return (( obj )=>{
			obj.sub = () => [].concat( this.cell_content_text(id) )
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
	 *  cell_content!id /
	 *  ```
	 **/
	cell_content( id : any ) {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Cell_number!id $mol_grid_number sub / <= cell_content_number!id
	 *  ```
	 **/
	@ $mol_mem_key
	Cell_number( id : any ) {
		return (( obj )=>{
			obj.sub = () => [].concat( this.cell_content_number(id) )
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
	 *  	sub / <= col_head_content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Col_head( id : any ) {
		return (( obj )=>{
			obj.dom_name = () => "th"
			obj.sub = () => [].concat( this.col_head_content(id) )
			return obj
		})( new this.$.$mol_float(  ) )
	}

	/**
	 *  ```
	 *  col_head_content!id /
	 *  ```
	 **/
	col_head_content( id : any ) {
		return [].concat(  )
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
	cell_expanded( id : any , val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Cell_content!id / <= Cell_dimmer!id
	 *  ```
	 **/
	Cell_content( id : any ) {
		return [].concat( this.Cell_dimmer(id) )
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

namespace $ { export class $mol_grid_table extends $mol_view {

	/**
	 *  ```
	 *  dom_name \table
	 *  ```
	 **/
	dom_name() {
		return "table"
	}

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	top <= offset
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"top" :  this.offset() ,
		})
	}

	/**
	 *  ```
	 *  offset 0
	 *  ```
	 **/
	offset() {
		return 0
	}

} }

namespace $ { export class $mol_grid_gap extends $mol_view {

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	top <= offset
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"top" :  this.offset() ,
		})
	}

	/**
	 *  ```
	 *  offset 0
	 *  ```
	 **/
	offset() {
		return 0
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
	 *  style *
	 *  	^
	 *  	height <= height
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"height" :  this.height() ,
		})
	}

	/**
	 *  ```
	 *  height 40
	 *  ```
	 **/
	height() {
		return 40
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
	 *  cells /
	 *  ```
	 **/
	cells() {
		return [].concat(  )
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

} }

namespace $ { export class $mol_grid_number extends $mol_grid_cell {

} }

