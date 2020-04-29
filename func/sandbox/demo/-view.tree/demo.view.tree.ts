namespace $ { export class $mol_func_sandbox_demo extends $mol_page {

	/**
	 *  ```
	 *  title \JavaScript Sandbox Demo
	 *  ```
	 **/
	title() {
		return "JavaScript Sandbox Demo"
	}

	/**
	 *  ```
	 *  tools / <= Source
	 *  ```
	 **/
	tools() {
		return [this.Source()] as readonly any[]
	}

	/**
	 *  ```
	 *  Source $mol_link_iconed
	 *  	uri \https://github.com/eigenmethod/mol/tree/master/func/sandbox
	 *  	title \
	 *  ```
	 **/
	@ $mol_mem
	Source() {
		return (( obj )=>{
			obj.uri = () => "https://github.com/eigenmethod/mol/tree/master/func/sandbox"
			obj.title = () => ""
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  Sandbox $mol_func_sandbox
	 *  ```
	 **/
	@ $mol_mem
	Sandbox() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_func_sandbox(  ) )
	}

	/**
	 *  ```
	 *  event * keydown?event <=> keydown?event
	 *  ```
	 **/
	event() {
		return ({
			"keydown" :  ( event? : any )=>  this.keydown( event ) ,
		})
	}

	/**
	 *  ```
	 *  keydown?event null
	 *  ```
	 **/
	@ $mol_mem
	keydown( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  body /
	 *  	<= Input
	 *  	<= Result
	 *  	<= Snippets
	 *  ```
	 **/
	body() {
		return [this.Input() , this.Result() , this.Snippets()] as readonly any[]
	}

	/**
	 *  ```
	 *  Input $mol_bar sub /
	 *  	<= Code
	 *  	<= Run
	 *  ```
	 **/
	@ $mol_mem
	Input() {
		return (( obj )=>{
			obj.sub = () => [this.Code() , this.Run()] as readonly any[]
			return obj
		})( new this.$.$mol_bar(  ) )
	}

	/**
	 *  ```
	 *  Code $mol_textarea
	 *  	hint \return document.cookie
	 *  	value?val <=> script?val
	 *  ```
	 **/
	@ $mol_mem
	Code() {
		return (( obj )=>{
			obj.hint = () => "return document.cookie"
			obj.value = ( val? : any ) => this.script( val )
			return obj
		})( new this.$.$mol_textarea(  ) )
	}

	/**
	 *  ```
	 *  script?val \
	 *  ```
	 **/
	@ $mol_mem
	script( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Run $mol_button_major
	 *  	title \Hack
	 *  	click?event <=> run?event
	 *  ```
	 **/
	@ $mol_mem
	Run() {
		return (( obj )=>{
			obj.title = () => "Hack"
			obj.click = ( event? : any ) => this.run( event )
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  run?event null
	 *  ```
	 **/
	@ $mol_mem
	run( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  Result $mol_view sub / <= result?val
	 *  ```
	 **/
	@ $mol_mem
	Result() {
		return (( obj )=>{
			obj.sub = () => [this.result()] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  result?val \
	 *  ```
	 **/
	@ $mol_mem
	result( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Snippets $mol_list rows <= snippets
	 *  ```
	 **/
	@ $mol_mem
	Snippets() {
		return (( obj )=>{
			obj.rows = () => this.snippets()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  snippets /
	 *  ```
	 **/
	snippets() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Snippet!id $mol_func_sandbox_demo_snippet code <= snippet_code!id
	 *  ```
	 **/
	@ $mol_mem_key
	Snippet( id : any ) {
		return (( obj )=>{
			obj.code = () => this.snippet_code(id)
			return obj
		})( new this.$.$mol_func_sandbox_demo_snippet(  ) )
	}

	/**
	 *  ```
	 *  snippet_code!id \
	 *  ```
	 **/
	snippet_code( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  snippet_codes /
	 *  	\return document.cookie
	 *  	\
	 *  		\let evil = eval
	 *  		\return evil( 'document.cookie' )
	 *  	\
	 *  		\let Function = ( ()=>{} ).constructor
	 *  		\let getCookie = Function( 'return document.cookie' )
	 *  		\return getCookie()
	 *  	\
	 *  		\let NumberProto = (0).__proto__
	 *  		\NumberProto.toString = null
	 *  ```
	 **/
	snippet_codes() {
		return ["return document.cookie" , "let evil = eval\nreturn evil( 'document.cookie' )" , "let Function = ( ()=>{} ).constructor\nlet getCookie = Function( 'return document.cookie' )\nreturn getCookie()" , "let NumberProto = (0).__proto__\nNumberProto.toString = null"] as readonly any[]
	}

} }
namespace $ { export class $mol_func_sandbox_demo_snippet extends $mol_link {

	/**
	 *  ```
	 *  arg * script <= code
	 *  ```
	 **/
	arg() {
		return ({
			"script" :  this.code() ,
		})
	}

	/**
	 *  ```
	 *  code \
	 *  ```
	 **/
	code() {
		return ""
	}

	/**
	 *  ```
	 *  sub / <= Text
	 *  ```
	 **/
	sub() {
		return [this.Text()] as readonly any[]
	}

	/**
	 *  ```
	 *  Text $mol_text text <= text
	 *  ```
	 **/
	@ $mol_mem
	Text() {
		return (( obj )=>{
			obj.text = () => this.text()
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  text <= code
	 *  ```
	 **/
	text() {
		return this.code()
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/func/sandbox/demo/-view.tree/demo.view.tree.map