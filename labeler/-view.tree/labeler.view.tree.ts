namespace $ { export class $mol_labeler extends $mol_view {

	/**
	 *  ```
	 *  sub /
	 *  	<= Title
	 *  	<= Content
	 *  ```
	 **/
	sub() {
		return [ this.Title() , this.Content() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Title $mol_view sub <= label
	 *  ```
	 **/
	@ $mol_mem
	Title() {
		return (( obj )=>{
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
		return [ this.title() ] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  Content $mol_view sub <= content
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
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
		return [  ] as readonly any[]
	}

} }

