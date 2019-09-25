namespace $ { export class $mol_app_request extends $mol_page {

	/**
	 *  ```
	 *  title @ \HTTP request browser
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_request_title" )
	}

	/**
	 *  ```
	 *  body /
	 *  	<= Uri_input
	 *  	<= Data
	 *  ```
	 **/
	body() {
		return [].concat( this.Uri_input() , this.Data() )
	}

	/**
	 *  ```
	 *  Uri_input $mol_string
	 *  	value?val <=> uri?val
	 *  	hint <= uri_hint
	 *  ```
	 **/
	@ $mol_mem
	Uri_input() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.uri( val )
			obj.hint = () => this.uri_hint()
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  uri?val \
	 *  ```
	 **/
	@ $mol_mem
	uri( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  uri_hint @ \URI
	 *  ```
	 **/
	uri_hint() {
		return this.$.$mol_locale.text( "$mol_app_request_uri_hint" )
	}

	/**
	 *  ```
	 *  Data $mol_view sub /
	 *  	<= Request
	 *  	<= Response
	 *  ```
	 **/
	@ $mol_mem
	Data() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Request() , this.Response() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Request $mol_scroll sub /
	 *  	<= Request_headers
	 *  	<= Request_body
	 *  ```
	 **/
	@ $mol_mem
	Request() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Request_headers() , this.Request_body() )
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Request_headers $mol_labeler
	 *  	title <= request_headers_title
	 *  	Content <= Request_headers_input
	 *  ```
	 **/
	@ $mol_mem
	Request_headers() {
		return (( obj )=>{
			obj.title = () => this.request_headers_title()
			obj.Content = () => this.Request_headers_input()
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  request_headers_title @ \Request headers
	 *  ```
	 **/
	request_headers_title() {
		return this.$.$mol_locale.text( "$mol_app_request_request_headers_title" )
	}

	/**
	 *  ```
	 *  Request_headers_input $mol_textarea value?val <=> request_headers?val
	 *  ```
	 **/
	@ $mol_mem
	Request_headers_input() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.request_headers( val )
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  request_headers?val \
	 *  ```
	 **/
	@ $mol_mem
	request_headers( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Request_body $mol_labeler
	 *  	title <= request_body_title
	 *  	Content <= Request_body_input
	 *  ```
	 **/
	@ $mol_mem
	Request_body() {
		return (( obj )=>{
			obj.title = () => this.request_body_title()
			obj.Content = () => this.Request_body_input()
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  request_body_title @ \Request body
	 *  ```
	 **/
	request_body_title() {
		return this.$.$mol_locale.text( "$mol_app_request_request_body_title" )
	}

	/**
	 *  ```
	 *  Request_body_input $mol_textarea value?val <=> request_body?val
	 *  ```
	 **/
	@ $mol_mem
	Request_body_input() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.request_body( val )
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  request_body?val \
	 *  ```
	 **/
	@ $mol_mem
	request_body( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Response $mol_scroll sub /
	 *  	<= Response_headers
	 *  	<= Response_body
	 *  ```
	 **/
	@ $mol_mem
	Response() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Response_headers() , this.Response_body() )
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Response_headers $mol_labeler
	 *  	title <= response_headers_title
	 *  	Content <= Response_headers_output
	 *  ```
	 **/
	@ $mol_mem
	Response_headers() {
		return (( obj )=>{
			obj.title = () => this.response_headers_title()
			obj.Content = () => this.Response_headers_output()
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  response_headers_title @ \Response headers
	 *  ```
	 **/
	response_headers_title() {
		return this.$.$mol_locale.text( "$mol_app_request_response_headers_title" )
	}

	/**
	 *  ```
	 *  Response_headers_output $mol_textarea
	 *  	enabled false
	 *  	value <= response_headers
	 *  ```
	 **/
	@ $mol_mem
	Response_headers_output() {
		return (( obj )=>{
			obj.enabled = () => false
			obj.value = () => this.response_headers()
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  response_headers \
	 *  ```
	 **/
	response_headers() {
		return ""
	}

	/**
	 *  ```
	 *  Response_body $mol_labeler
	 *  	title <= response_body_title
	 *  	Content <= Response_body_output
	 *  ```
	 **/
	@ $mol_mem
	Response_body() {
		return (( obj )=>{
			obj.title = () => this.response_body_title()
			obj.Content = () => this.Response_body_output()
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  response_body_title @ \Response body
	 *  ```
	 **/
	response_body_title() {
		return this.$.$mol_locale.text( "$mol_app_request_response_body_title" )
	}

	/**
	 *  ```
	 *  Response_body_output $mol_textarea
	 *  	enabled false
	 *  	value <= response_body
	 *  ```
	 **/
	@ $mol_mem
	Response_body_output() {
		return (( obj )=>{
			obj.enabled = () => false
			obj.value = () => this.response_body()
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  response_body \
	 *  ```
	 **/
	response_body() {
		return ""
	}

} }

