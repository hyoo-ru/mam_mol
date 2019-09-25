namespace $ { export class $mol_app_rdf extends $mol_page {

	/**
	 *  ```
	 *  title @ \RDF graph browser
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_rdf_title" )
	}

	/**
	 *  ```
	 *  tools / <= Source
	 *  ```
	 **/
	tools() {
		return [].concat( this.Source() )
	}

	/**
	 *  ```
	 *  Source $mol_link_iconed
	 *  	uri \https://github.com/eigenmethod/mol/tree/master/app/rdf
	 *  	title \
	 *  ```
	 **/
	@ $mol_mem
	Source() {
		return (( obj )=>{
			obj.uri = () => "https://github.com/eigenmethod/mol/tree/master/app/rdf"
			obj.title = () => ""
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Head
	 *  	<= Uri
	 *  	<= Body
	 *  ```
	 **/
	sub() {
		return [].concat( this.Head() , this.Uri() , this.Body() )
	}

	/**
	 *  ```
	 *  Uri $mol_string
	 *  	value?val <=> uri?val
	 *  	hint <= uri_hint
	 *  ```
	 **/
	@ $mol_mem
	Uri() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.uri( val )
			obj.hint = () => this.uri_hint()
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  uri?val \http://dbpedia.org/ontology/
	 *  ```
	 **/
	@ $mol_mem
	uri( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : "http://dbpedia.org/ontology/"
	}

	/**
	 *  ```
	 *  uri_hint \URI
	 *  ```
	 **/
	uri_hint() {
		return "URI"
	}

	/**
	 *  ```
	 *  body / <= Subjects
	 *  ```
	 **/
	body() {
		return [].concat( this.Subjects() )
	}

	/**
	 *  ```
	 *  Subjects $mol_list rows <= subject_rows
	 *  ```
	 **/
	@ $mol_mem
	Subjects() {
		return (( obj )=>{
			obj.rows = () => this.subject_rows()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  subject_rows /
	 *  ```
	 **/
	subject_rows() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Subject_row!uri $mol_view sub /
	 *  	<= Subject!uri
	 *  	<= Predicates!uri
	 *  ```
	 **/
	@ $mol_mem_key
	Subject_row( uri : any ) {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Subject(uri) , this.Predicates(uri) )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Subject!uri $mol_link
	 *  	title <= subject_title!uri
	 *  	uri <= subject_uri!uri
	 *  ```
	 **/
	@ $mol_mem_key
	Subject( uri : any ) {
		return (( obj )=>{
			obj.title = () => this.subject_title(uri)
			obj.uri = () => this.subject_uri(uri)
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  subject_title!uri \
	 *  ```
	 **/
	subject_title( uri : any ) {
		return ""
	}

	/**
	 *  ```
	 *  subject_uri!uri \
	 *  ```
	 **/
	subject_uri( uri : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Predicates!uri $mol_list rows <= predicate_rows!uri
	 *  ```
	 **/
	@ $mol_mem_key
	Predicates( uri : any ) {
		return (( obj )=>{
			obj.rows = () => this.predicate_rows(uri)
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  predicate_rows!uri /
	 *  ```
	 **/
	predicate_rows( uri : any ) {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Predicate_row!id $mol_view sub /
	 *  	<= Predicate!id
	 *  	<= Objects!id
	 *  ```
	 **/
	@ $mol_mem_key
	Predicate_row( id : any ) {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Predicate(id) , this.Objects(id) )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Predicate!id $mol_link
	 *  	title <= predicate_title!id
	 *  	uri <= predicate_uri!id
	 *  ```
	 **/
	@ $mol_mem_key
	Predicate( id : any ) {
		return (( obj )=>{
			obj.title = () => this.predicate_title(id)
			obj.uri = () => this.predicate_uri(id)
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  predicate_title!id \
	 *  ```
	 **/
	predicate_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  predicate_uri!id \
	 *  ```
	 **/
	predicate_uri( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Objects!id $mol_list rows <= object_rows!id
	 *  ```
	 **/
	@ $mol_mem_key
	Objects( id : any ) {
		return (( obj )=>{
			obj.rows = () => this.object_rows(id)
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  object_rows!id /
	 *  ```
	 **/
	object_rows( id : any ) {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Resource!id $mol_link
	 *  	title <= resource_title!id
	 *  	uri <= resource_uri!id
	 *  ```
	 **/
	@ $mol_mem_key
	Resource( id : any ) {
		return (( obj )=>{
			obj.title = () => this.resource_title(id)
			obj.uri = () => this.resource_uri(id)
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  resource_title!id \
	 *  ```
	 **/
	resource_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  resource_uri!id \
	 *  ```
	 **/
	resource_uri( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Value!id $mol_view sub / <= value!id
	 *  ```
	 **/
	@ $mol_mem_key
	Value( id : any ) {
		return (( obj )=>{
			obj.sub = () => [].concat( this.value(id) )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  value!id \
	 *  ```
	 **/
	value( id : any ) {
		return ""
	}

} }

