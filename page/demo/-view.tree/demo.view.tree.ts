namespace $ { export class $mol_page_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Page with header, body and footer
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_page_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Page
	 *  ```
	 **/
	sub() {
		return [].concat( this.Page() )
	}

	/**
	 *  ```
	 *  Page $mol_page
	 *  	tools / <= Button
	 *  	body / <= Content
	 *  	foot / <= Foot_content
	 *  ```
	 **/
	@ $mol_mem
	Page() {
		return (( obj )=>{
			obj.tools = () => [].concat( this.Button() )
			obj.body = () => [].concat( this.Content() )
			obj.foot = () => [].concat( this.Foot_content() )
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  Button $mol_button_minor title \Toolbar Button
	 *  ```
	 **/
	@ $mol_mem
	Button() {
		return (( obj )=>{
			obj.title = () => "Toolbar Button"
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  Content $mol_row sub / <= Text
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Text() )
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Text $mol_filler
	 *  ```
	 **/
	@ $mol_mem
	Text() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_filler(  ) )
	}

	/**
	 *  ```
	 *  Foot_content $mol_row sub / <= Foot_text
	 *  ```
	 **/
	@ $mol_mem
	Foot_content() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Foot_text() )
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Foot_text $mol_view sub / \Footer
	 *  ```
	 **/
	@ $mol_mem
	Foot_text() {
		return (( obj )=>{
			obj.sub = () => [].concat( "Footer" )
			return obj
		})( new this.$.$mol_view(  ) )
	}

} }

