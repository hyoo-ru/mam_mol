namespace $ { export class $mol_app_report extends $mol_page {

	/**
	 *  ```
	 *  title @ \Pump #1337 - Technical passport
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_report_title" )
	}

	/**
	 *  ```
	 *  body /
	 *  	<= descriptor
	 *  	<= tabler
	 *  ```
	 **/
	body() {
		return [this.descriptor() , this.tabler()] as readonly any[]
	}

	/**
	 *  ```
	 *  descriptor $mol_view sub / <= description
	 *  ```
	 **/
	@ $mol_mem
	descriptor() {
		return (( obj )=>{
			obj.sub = () => [this.description()] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  description \
	 *  ```
	 **/
	description() {
		return ""
	}

	/**
	 *  ```
	 *  tabler $mol_app_report_tabler rows <= rows
	 *  ```
	 **/
	@ $mol_mem
	tabler() {
		return (( obj )=>{
			obj.rows = () => this.rows()
			return obj
		})( new this.$.$mol_app_report_tabler(  ) )
	}

	/**
	 *  ```
	 *  rows / <= headRower
	 *  ```
	 **/
	rows() {
		return [this.headRower()] as readonly any[]
	}

	/**
	 *  ```
	 *  headRower $mol_app_report_rower cells <= headCells
	 *  ```
	 **/
	@ $mol_mem
	headRower() {
		return (( obj )=>{
			obj.cells = () => this.headCells()
			return obj
		})( new this.$.$mol_app_report_rower(  ) )
	}

	/**
	 *  ```
	 *  headCells /
	 *  ```
	 **/
	headCells() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  rower!id $mol_app_report_rower cells <= rowerCells!id
	 *  ```
	 **/
	@ $mol_mem_key
	rower( id : any ) {
		return (( obj )=>{
			obj.cells = () => this.rowerCells(id)
			return obj
		})( new this.$.$mol_app_report_rower(  ) )
	}

	/**
	 *  ```
	 *  rowerCells!id /
	 *  ```
	 **/
	rowerCells( id : any ) {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  cell!id $mol_app_report_cell
	 *  	content <= cell_content!id
	 *  	rows <= cellrows!id
	 *  	cols <= cellCols!id
	 *  ```
	 **/
	@ $mol_mem_key
	cell( id : any ) {
		return (( obj )=>{
			obj.content = () => this.cell_content(id)
			obj.rows = () => this.cellrows(id)
			obj.cols = () => this.cellCols(id)
			return obj
		})( new this.$.$mol_app_report_cell(  ) )
	}

	/**
	 *  ```
	 *  cell_content!id null
	 *  ```
	 **/
	cell_content( id : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  cellrows!id 1
	 *  ```
	 **/
	cellrows( id : any ) {
		return 1
	}

	/**
	 *  ```
	 *  cellCols!id 1
	 *  ```
	 **/
	cellCols( id : any ) {
		return 1
	}

	/**
	 *  ```
	 *  texter!id $mol_view sub / <= cell_value!id?val
	 *  ```
	 **/
	@ $mol_mem_key
	texter( id : any ) {
		return (( obj )=>{
			obj.sub = () => [this.cell_value(id)] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  cell_value!id?val null
	 *  ```
	 **/
	@ $mol_mem_key
	cell_value( id : any , val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  select!id $mol_select
	 *  	value?val <=> cell_value!id?val
	 *  	dictionary <= cell_options!id
	 *  ```
	 **/
	@ $mol_mem_key
	select( id : any ) {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.cell_value(id , val )
			obj.dictionary = () => this.cell_options(id)
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  cell_options!id *
	 *  ```
	 **/
	cell_options( id : any ) {
		return ({
		})
	}

	/**
	 *  ```
	 *  number!id $mol_number value?val <=> cell_value!id?val
	 *  ```
	 **/
	@ $mol_mem_key
	number( id : any ) {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.cell_value(id , val )
			return obj
		})( new this.$.$mol_number(  ) )
	}

} }
namespace $ { export class $mol_app_report_tabler extends $mol_view {

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

} }
namespace $ { export class $mol_app_report_rower extends $mol_view {

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
	 *  cells /
	 *  ```
	 **/
	cells() {
		return [] as readonly any[]
	}

} }
namespace $ { export class $mol_app_report_cell extends $mol_view {

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
	 *  attr *
	 *  	^
	 *  	colspan <= cols
	 *  	rowspan <= rows
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"colspan" :  this.cols() ,
			"rowspan" :  this.rows() ,
		})
	}

	/**
	 *  ```
	 *  cols 1
	 *  ```
	 **/
	cols() {
		return 1
	}

	/**
	 *  ```
	 *  rows 1
	 *  ```
	 **/
	rows() {
		return 1
	}

	/**
	 *  ```
	 *  sub / <= content
	 *  ```
	 **/
	sub() {
		return [this.content()] as readonly any[]
	}

	/**
	 *  ```
	 *  content null
	 *  ```
	 **/
	content() {
		return null as any
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/app/report/-view.tree/report.view.tree.map