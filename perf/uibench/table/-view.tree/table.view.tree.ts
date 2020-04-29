namespace $ { export class $mol_perf_uibench_table extends $mol_list {

	/**
	 *  ```
	 *  state null
	 *  ```
	 **/
	state() {
		return null as any
	}

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
	 *  attr_static *
	 *  	^
	 *  	class \Table
	 *  ```
	 **/
	attr_static() {
		return ({
			...super.attr_static() ,
			"class" :  "Table" ,
		})
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
	 *  rows /
	 *  ```
	 **/
	rows() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Row!index $mol_perf_uibench_table_row state <= row_state!index
	 *  ```
	 **/
	@ $mol_mem_key
	Row( index : any ) {
		return (( obj )=>{
			obj.state = () => this.row_state(index)
			return obj
		})( new this.$.$mol_perf_uibench_table_row(  ) )
	}

	/**
	 *  ```
	 *  row_state!index null
	 *  ```
	 **/
	row_state( index : any ) {
		return null as any
	}

} }
namespace $ { export class $mol_perf_uibench_table_row extends $mol_view {

	/**
	 *  ```
	 *  state null
	 *  ```
	 **/
	state() {
		return null as any
	}

	/**
	 *  ```
	 *  minimal_height 18
	 *  ```
	 **/
	minimal_height() {
		return 18
	}

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
	 *  attr *
	 *  	^
	 *  	class <= classes
	 *  	data-id <= id
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"class" :  this.classes() ,
			"data-id" :  this.id() ,
		})
	}

	/**
	 *  ```
	 *  classes \TableRow
	 *  ```
	 **/
	classes() {
		return "TableRow"
	}

	/**
	 *  ```
	 *  id 0
	 *  ```
	 **/
	id() {
		return 0
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Head
	 *  	<= cells
	 *  ```
	 **/
	sub() {
		return [this.Head() , this.cells()] as readonly any[]
	}

	/**
	 *  ```
	 *  Head $mol_perf_uibench_table_cell text <= head_text
	 *  ```
	 **/
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.text = () => this.head_text()
			return obj
		})( new this.$.$mol_perf_uibench_table_cell(  ) )
	}

	/**
	 *  ```
	 *  head_text \
	 *  ```
	 **/
	head_text() {
		return ""
	}

	/**
	 *  ```
	 *  cells /
	 *  ```
	 **/
	cells() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Cell!index $mol_perf_uibench_table_cell text <= cell_state!index
	 *  ```
	 **/
	@ $mol_mem_key
	Cell( index : any ) {
		return (( obj )=>{
			obj.text = () => this.cell_state(index)
			return obj
		})( new this.$.$mol_perf_uibench_table_cell(  ) )
	}

	/**
	 *  ```
	 *  cell_state!index null
	 *  ```
	 **/
	cell_state( index : any ) {
		return null as any
	}

} }
namespace $ { export class $mol_perf_uibench_table_cell extends $mol_view {

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
	 *  attr_static *
	 *  	^
	 *  	class \TableCell
	 *  ```
	 **/
	attr_static() {
		return ({
			...super.attr_static() ,
			"class" :  "TableCell" ,
		})
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	click?val <=> click?val
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"click" :  ( val? : any )=>  this.click( val ) ,
		})
	}

	/**
	 *  ```
	 *  click?val null
	 *  ```
	 **/
	@ $mol_mem
	click( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  sub / <= text
	 *  ```
	 **/
	sub() {
		return [this.text()] as readonly any[]
	}

	/**
	 *  ```
	 *  text \
	 *  ```
	 **/
	text() {
		return ""
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/perf/uibench/table/-view.tree/table.view.tree.map