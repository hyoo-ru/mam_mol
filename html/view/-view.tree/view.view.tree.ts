namespace $ { export class $mol_html_view extends $mol_list {

	/**
	 *  ```
	 *  html \
	 *  ```
	 **/
	html() {
		return ""
	}

	/**
	 *  ```
	 *  dom null
	 *  ```
	 **/
	dom() {
		return null as any
	}

	/**
	 *  ```
	 *  safe_link!uri \
	 *  ```
	 **/
	safe_link( uri : any ) {
		return ""
	}

	/**
	 *  ```
	 *  xss_uri \https://en.wikipedia.org/wiki/XSS#
	 *  ```
	 **/
	xss_uri() {
		return "https://en.wikipedia.org/wiki/XSS#"
	}

	/**
	 *  ```
	 *  Heading!id $mol_html_view_heading
	 *  	level <= heading_level!id
	 *  	sub <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Heading( id : any ) {
		return (( obj )=>{
			obj.level = () => this.heading_level(id)
			obj.sub = () => this.content(id)
			return obj
		})( new this.$.$mol_html_view_heading(  ) )
	}

	/**
	 *  ```
	 *  heading_level!id 1
	 *  ```
	 **/
	heading_level( id : any ) {
		return 1
	}

	/**
	 *  ```
	 *  content!id /
	 *  ```
	 **/
	content( id : any ) {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Paragraph!id $mol_paragraph sub <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Paragraph( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.content(id)
			return obj
		})( new this.$.$mol_paragraph(  ) )
	}

	/**
	 *  ```
	 *  List!id $mol_list rows <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	List( id : any ) {
		return (( obj )=>{
			obj.rows = () => this.content(id)
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  Quote!id $mol_list rows <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Quote( id : any ) {
		return (( obj )=>{
			obj.rows = () => this.content(id)
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  Strong!id $mol_paragraph sub <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Strong( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.content(id)
			return obj
		})( new this.$.$mol_paragraph(  ) )
	}

	/**
	 *  ```
	 *  Emphasis!id $mol_paragraph sub <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Emphasis( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.content(id)
			return obj
		})( new this.$.$mol_paragraph(  ) )
	}

	/**
	 *  ```
	 *  Deleted!id $mol_paragraph sub <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Deleted( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.content(id)
			return obj
		})( new this.$.$mol_paragraph(  ) )
	}

	/**
	 *  ```
	 *  Inserted!id $mol_paragraph sub <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Inserted( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.content(id)
			return obj
		})( new this.$.$mol_paragraph(  ) )
	}

	/**
	 *  ```
	 *  Code!id $mol_paragraph sub <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Code( id : any ) {
		return (( obj )=>{
			obj.sub = () => this.content(id)
			return obj
		})( new this.$.$mol_paragraph(  ) )
	}

	/**
	 *  ```
	 *  Link!id $mol_link_iconed
	 *  	uri <= link_uri!id
	 *  	content <= content!id
	 *  ```
	 **/
	@ $mol_mem_key
	Link( id : any ) {
		return (( obj )=>{
			obj.uri = () => this.link_uri(id)
			obj.content = () => this.content(id)
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  link_uri!id \
	 *  ```
	 **/
	link_uri( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Image!id $mol_image uri <= image_uri!id
	 *  ```
	 **/
	@ $mol_mem_key
	Image( id : any ) {
		return (( obj )=>{
			obj.uri = () => this.image_uri(id)
			return obj
		})( new this.$.$mol_image(  ) )
	}

	/**
	 *  ```
	 *  image_uri!id \
	 *  ```
	 **/
	image_uri( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Break!id $mol_paragraph
	 *  ```
	 **/
	@ $mol_mem_key
	Break( id : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_paragraph(  ) )
	}

	/**
	 *  ```
	 *  Text!id $mol_dimmer
	 *  	needle <= highlight
	 *  	haystack <= text!id
	 *  ```
	 **/
	@ $mol_mem_key
	Text( id : any ) {
		return (( obj )=>{
			obj.needle = () => this.highlight()
			obj.haystack = () => this.text(id)
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  highlight \
	 *  ```
	 **/
	highlight() {
		return ""
	}

	/**
	 *  ```
	 *  text!id \
	 *  ```
	 **/
	text( id : any ) {
		return ""
	}

} }
namespace $ { export class $mol_html_view_heading extends $mol_paragraph {

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_html_view_heading <= level
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_html_view_heading" :  this.level() ,
		})
	}

	/**
	 *  ```
	 *  level 1
	 *  ```
	 **/
	level() {
		return 1
	}

} }
