namespace $ { export class $mol_perf_dbmon extends $mol_scroll {

	/**
	 *  ```
	 *  title \dbmon ($mol)
	 *  ```
	 **/
	title() {
		return "dbmon ($mol)"
	}

	/**
	 *  ```
	 *  sub / <= Databases
	 *  ```
	 **/
	sub() {
		return [ this.Databases() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Databases $mol_list rows <= databases
	 *  ```
	 **/
	@ $mol_mem
	Databases() {
		return (( obj )=>{
			obj.rows = () => this.databases()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  databases /
	 *  ```
	 **/
	databases() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Database!id $mol_view sub <= database!id
	 *  ```
	 **/
	@ $mol_mem_key
	Database( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.database(id)
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  database!id /
	 *  	<= Name!id
	 *  	<= Query_count!id
	 *  	<= top_queries!id
	 *  ```
	 **/
	database( id : any ) {
		return [ this.Name(id) , this.Query_count(id) , this.top_queries(id) ] as readonly any[]
	}

	/**
	 *  ```
	 *  Name!id $mol_view sub / <= name!id
	 *  ```
	 **/
	@ $mol_mem_key
	Name( id : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.name(id) ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  name!id \
	 *  ```
	 **/
	name( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Query_count!id $mol_perf_dbmon_query_count
	 *  	label_mod <= query_count_label_mod!id
	 *  	count <= query_count!id
	 *  ```
	 **/
	@ $mol_mem_key
	Query_count( id : any ) {
		return (( obj )=>{
			obj.label_mod = () => this.query_count_label_mod(id)
			obj.count = () => this.query_count(id)
			return obj
		})( new this.$.$mol_perf_dbmon_query_count(  ) )
	}

	/**
	 *  ```
	 *  query_count_label_mod!id \
	 *  ```
	 **/
	query_count_label_mod( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  query_count!id 0
	 *  ```
	 **/
	query_count( id : any ) {
		return 0
	}

	/**
	 *  ```
	 *  top_queries!id /
	 *  ```
	 **/
	top_queries( id : any ) {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Query!id $mol_perf_dbmon_query
	 *  	elapsed <= query_elapsed!id
	 *  	elapsed_mod <= query_elapsed_mod!id
	 *  	value <= query_value!id
	 *  ```
	 **/
	@ $mol_mem_key
	Query( id : any ) {
		return (( obj )=>{
			obj.elapsed = () => this.query_elapsed(id)
			obj.elapsed_mod = () => this.query_elapsed_mod(id)
			obj.value = () => this.query_value(id)
			return obj
		})( new this.$.$mol_perf_dbmon_query(  ) )
	}

	/**
	 *  ```
	 *  query_elapsed!id \
	 *  ```
	 **/
	query_elapsed( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  query_elapsed_mod!id \
	 *  ```
	 **/
	query_elapsed_mod( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  query_value!id \
	 *  ```
	 **/
	query_value( id : any ) {
		return ""
	}

} }

namespace $ { export class $mol_perf_dbmon_query_count extends $mol_view {

	/**
	 *  ```
	 *  sub / <= Label
	 *  ```
	 **/
	sub() {
		return [ this.Label() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Label $mol_view
	 *  	attr * mol_perf_dbmon_query_count_label <= label_mod
	 *  	sub / <= count
	 *  ```
	 **/
	@ $mol_mem
	Label() {
		return (( obj )=>{
			obj.attr = () => ({
			"mol_perf_dbmon_query_count_label" :  this.label_mod() ,
		})
			obj.sub = () => [ this.count() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  label_mod \
	 *  ```
	 **/
	label_mod() {
		return ""
	}

	/**
	 *  ```
	 *  count 0
	 *  ```
	 **/
	count() {
		return 0
	}

} }

namespace $ { export class $mol_perf_dbmon_query extends $mol_pop_over {

	/**
	 *  ```
	 *  minimal_height 40
	 *  ```
	 **/
	minimal_height() {
		return 40
	}

	/**
	 *  ```
	 *  Anchor <= Elapsed
	 *  ```
	 **/
	Anchor() {
		return this.Elapsed()
	}

	/**
	 *  ```
	 *  Elapsed $mol_view
	 *  	attr * mol_perf_dbmon_query_elapsed <= elapsed_mod
	 *  	sub / <= elapsed
	 *  ```
	 **/
	@ $mol_mem
	Elapsed() {
		return (( obj )=>{
			obj.attr = () => ({
			"mol_perf_dbmon_query_elapsed" :  this.elapsed_mod() ,
		})
			obj.sub = () => [ this.elapsed() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  elapsed_mod \
	 *  ```
	 **/
	elapsed_mod() {
		return ""
	}

	/**
	 *  ```
	 *  elapsed \
	 *  ```
	 **/
	elapsed() {
		return ""
	}

	/**
	 *  ```
	 *  bubble_content / <= value
	 *  ```
	 **/
	bubble_content() {
		return [ this.value() ] as readonly any[]
	}

	/**
	 *  ```
	 *  value \
	 *  ```
	 **/
	value() {
		return ""
	}

	/**
	 *  ```
	 *  align \left_center
	 *  ```
	 **/
	align() {
		return "left_center"
	}

} }

