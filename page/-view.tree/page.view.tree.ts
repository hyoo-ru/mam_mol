namespace $ { export class $mol_page extends $mol_view {

	/**
	 *  ```
	 *  sub /
	 *  	<= Head
	 *  	<= Body
	 *  	<= Foot
	 *  ```
	 **/
	sub() {
		return [this.Head() , this.Body() , this.Foot()] as readonly any[]
	}

	/**
	 *  ```
	 *  Head $mol_view sub <= head
	 *  ```
	 **/
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.sub = () => this.head()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  head /
	 *  	<= Title
	 *  	<= Tools
	 *  ```
	 **/
	head() {
		return [this.Title() , this.Tools()] as readonly any[]
	}

	/**
	 *  ```
	 *  Title $mol_button
	 *  	sub / <= title
	 *  	event_click?val <=> event_top?val
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.sub = () => [this.title()] as readonly any[]
			obj.event_click = ( val? : any ) => this.event_top( val )
			return obj
		})( new this.$.$mol_button(  ) )
	}

	/**
	 *  ```
	 *  event_top?val null
	 *  ```
	 **/
	@ $mol_mem
	event_top( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Tools $mol_view sub <= tools
	 *  ```
	 **/
	@ $mol_mem
	Tools() {
		return (( obj )=>{
			obj.sub = () => this.tools()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  tools /$mol_view_content
	 *  ```
	 **/
	tools() {
		return [] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  Body $mol_scroll
	 *  	scroll_top?val <=> body_scroll_top?val
	 *  	sub <= body
	 *  ```
	 **/
	@ $mol_mem
	Body() {
		return (( obj )=>{
			obj.scroll_top = ( val? : any ) => this.body_scroll_top( val )
			obj.sub = () => this.body()
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  body_scroll_top?val 0
	 *  ```
	 **/
	@ $mol_mem
	body_scroll_top( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  body /$mol_view_content
	 *  ```
	 **/
	body() {
		return [] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  Foot $mol_view sub <= foot
	 *  ```
	 **/
	@ $mol_mem
	Foot() {
		return (( obj )=>{
			obj.sub = () => this.foot()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  foot /$mol_view
	 *  ```
	 **/
	foot() {
		return [] as readonly ( $mol_view )[]
	}

} }
