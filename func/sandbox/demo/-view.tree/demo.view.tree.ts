namespace $ { export class $mol_func_sandbox_demo extends $mol_page {

	/**
	 *  ```
	 *  attr * mol_heme \$mol_theme_dark
	 *  ```
	 **/
	attr() {
		return ({
			"mol_heme" :  "$mol_theme_dark" ,
		})
	}

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
	 *  Source $mol_link_source uri \https://github.com/eigenmethod/mol/tree/master/func/sandbox
	 *  ```
	 **/
	@ $mol_mem
	Source() {
		return (( obj )=>{
			obj.uri = () => "https://github.com/eigenmethod/mol/tree/master/func/sandbox"
			return obj
		})( new this.$.$mol_link_source(  ) )
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
	 *  plugis / <= Hotkey
	 *  ```
	 **/
	plugis() {
		return [this.Hotkey()] as readonly any[]
	}

	/**
	 *  ```
	 *  Hotkey $mol_hotkey
	 *  	mod_ctrl true
	 *  	key * enter?event <=> run?event
	 *  ```
	 **/
	@ $mol_mem
	Hotkey() {
		return (( obj )=>{
			obj.mod_ctrl = () => true
			obj.key = () => ({
			"enter" :  ( event? : any )=>  this.run( event ) ,
		})
			return obj
		})( new this.$.$mol_hotkey(  ) )
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
	 *  	hint \return 42
	 *  	value?val <=> script?val
	 *  ```
	 **/
	@ $mol_mem
	Code() {
		return (( obj )=>{
			obj.hint = () => "return 42"
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
	 *  	hint \Run
	 *  	click?event <=> run?event
	 *  	sub / <= Run_icon
	 *  ```
	 **/
	@ $mol_mem
	Run() {
		return (( obj )=>{
			obj.hint = () => "Run"
			obj.click = ( event? : any ) => this.run( event )
			obj.sub = () => [this.Run_icon()] as readonly any[]
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  Run_icon $mol_icon_play
	 *  ```
	 **/
	@ $mol_mem
	Run_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_play(  ) )
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
	 *  		\let Function = ( async ()=> {} ).constructor
	 *  		\let getCookie = Function( 'return document.cookie' )
	 *  		\return getCookie()
	 *  	\
	 *  		\let NumberProto = (0n).__proto__
	 *  		\NumberProto.toString = null
	 *  ```
	 **/
	snippet_codes() {
		return ["return document.cookie" , "let evil = eval\nreturn evil( 'document.cookie' )" , "let Function = ( async ()=> {} ).constructor\nlet getCookie = Function( 'return document.cookie' )\nreturn getCookie()" , "let NumberProto = (0n).__proto__\nNumberProto.toString = null"] as readonly any[]
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
