namespace $ { export class $mol_app_demo_placeholder extends $mol_book_placeholder {

	/**
	 *  ```
	 *  sub / <= Content
	 *  ```
	 **/
	sub() {
		return [ this.Content() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Content $mol_card content /
	 *  	<= Title
	 *  	<= Description
	 *  	<= Advantages
	 *  	<= Links
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.content = () => [ this.Title() , this.Description() , this.Advantages() , this.Links() ] as readonly any[]
			return obj
		})( new this.$.$mol_card(  ) )
	}

	/**
	 *  ```
	 *  Title $mol_view sub /
	 *  	<= Logo
	 *  	<= title
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.sub = () => [ this.Logo() , this.title() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Logo $mol_icon_mol
	 *  ```
	 **/
	@ $mol_mem
	Logo() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_mol(  ) )
	}

	/**
	 *  ```
	 *  title \mol
	 *  ```
	 **/
	title() {
		return "mol"
	}

	/**
	 *  ```
	 *  Description $mol_view sub / <= description
	 *  ```
	 **/
	@ $mol_mem
	Description() {
		return (( obj )=>{
			obj.sub = () => [ this.description() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  description @ \Reactive micro-modular ui framework. Very simple, but very powerful! $mol has small size of code, reactive architecture, components with adaptive design, that can be easily configured.
	 *  ```
	 **/
	description() {
		return this.$.$mol_locale.text( "$mol_app_demo_placeholder_description" )
	}

	/**
	 *  ```
	 *  Advantages $mol_view sub /
	 *  	<= Technology
	 *  	<= Code
	 *  	<= Programming
	 *  ```
	 **/
	@ $mol_mem
	Advantages() {
		return (( obj )=>{
			obj.sub = () => [ this.Technology() , this.Code() , this.Programming() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Technology $mol_app_placeholder_advantage
	 *  	image \mol/app/demo/placeholder/technology.svg
	 *  	title <= technology
	 *  ```
	 **/
	@ $mol_mem
	Technology() {
		return (( obj )=>{
			obj.image = () => "mol/app/demo/placeholder/technology.svg"
			obj.title = () => this.technology()
			return obj
		})( new this.$.$mol_app_placeholder_advantage(  ) )
	}

	/**
	 *  ```
	 *  technology @ \Flexible adaptive interface
	 *  ```
	 **/
	technology() {
		return this.$.$mol_locale.text( "$mol_app_demo_placeholder_technology" )
	}

	/**
	 *  ```
	 *  Code $mol_app_placeholder_advantage
	 *  	image \mol/app/demo/placeholder/code_rate.svg
	 *  	title <= code_rate
	 *  ```
	 **/
	@ $mol_mem
	Code() {
		return (( obj )=>{
			obj.image = () => "mol/app/demo/placeholder/code_rate.svg"
			obj.title = () => this.code_rate()
			return obj
		})( new this.$.$mol_app_placeholder_advantage(  ) )
	}

	/**
	 *  ```
	 *  code_rate @ \Quick and easy development
	 *  ```
	 **/
	code_rate() {
		return this.$.$mol_locale.text( "$mol_app_demo_placeholder_code_rate" )
	}

	/**
	 *  ```
	 *  Programming $mol_app_placeholder_advantage
	 *  	image \mol/app/demo/placeholder/programming.svg
	 *  	title <= programming
	 *  ```
	 **/
	@ $mol_mem
	Programming() {
		return (( obj )=>{
			obj.image = () => "mol/app/demo/placeholder/programming.svg"
			obj.title = () => this.programming()
			return obj
		})( new this.$.$mol_app_placeholder_advantage(  ) )
	}

	/**
	 *  ```
	 *  programming @ \High-speed applications
	 *  ```
	 **/
	programming() {
		return this.$.$mol_locale.text( "$mol_app_demo_placeholder_programming" )
	}

	/**
	 *  ```
	 *  Links $mol_row sub /
	 *  	<= Github_link
	 *  	<= Showcase_link
	 *  ```
	 **/
	@ $mol_mem
	Links() {
		return (( obj )=>{
			obj.sub = () => [ this.Github_link() , this.Showcase_link() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Github_link $mol_link_iconed uri \https://github.com/eigenmethod/mol
	 *  ```
	 **/
	@ $mol_mem
	Github_link() {
		return (( obj )=>{
			obj.uri = () => "https://github.com/eigenmethod/mol"
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  Showcase_link $mol_link_iconed
	 *  	title <= showcase_title
	 *  	uri \https://showcase.hyoo.ru
	 *  ```
	 **/
	@ $mol_mem
	Showcase_link() {
		return (( obj )=>{
			obj.title = () => this.showcase_title()
			obj.uri = () => "https://showcase.hyoo.ru"
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  showcase_title @ \Applications showcase
	 *  ```
	 **/
	showcase_title() {
		return this.$.$mol_locale.text( "$mol_app_demo_placeholder_showcase_title" )
	}

} }

namespace $ { export class $mol_app_placeholder_advantage extends $mol_view {

	/**
	 *  ```
	 *  sub /
	 *  	<= Image
	 *  	<= title
	 *  ```
	 **/
	sub() {
		return [ this.Image() , this.title() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Image $mol_image uri <= image
	 *  ```
	 **/
	@ $mol_mem
	Image() {
		return (( obj )=>{
			obj.uri = () => this.image()
			return obj
		})( new this.$.$mol_image(  ) )
	}

	/**
	 *  ```
	 *  image \
	 *  ```
	 **/
	image() {
		return ""
	}

	/**
	 *  ```
	 *  title \
	 *  ```
	 **/
	title() {
		return ""
	}

} }

