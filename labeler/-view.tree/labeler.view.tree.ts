namespace $ { export class $mol_labeler extends $mol_list {

	/**
	 *  ```
	 *  rows /
	 *  	<= Title
	 *  	<= Content
	 *  ```
	 **/
	rows() {
		return [this.Title() , this.Content()] as readonly any[]
	}

	/**
	 *  ```
	 *  Title $mol_view
	 *  	minimal_height 21
	 *  	sub <= label
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.minimal_height = () => 21
			obj.sub = () => this.label()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  label /$mol_view_content <= title
	 *  ```
	 **/
	label() {
		return [this.title()] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  Content $mol_view
	 *  	minimal_height 24
	 *  	sub <= content
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.minimal_height = () => 24
			obj.sub = () => this.content()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  content /
	 *  ```
	 **/
	content() {
		return [] as readonly any[]
	}

} }
