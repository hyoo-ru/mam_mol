namespace $ { export class $mol_labeler extends $mol_view {

	/**
	 *  ```
	 *  sub /
	 *  	<= Title
	 *  	<= Content
	 *  ```
	 **/
	sub() {
		return [].concat( this.Title() , this.Content() )
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
	 *  label / <= title
	 *  ```
	 **/
	label() {
		return [].concat( this.title() )
	}

	/**
	 *  ```
	 *  Content $mol_view sub / <= content
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.content() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  content null
	 *  ```
	 **/
	content() {
		return null as any
	}

} }

