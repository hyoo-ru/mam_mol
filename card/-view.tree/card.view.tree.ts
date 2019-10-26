namespace $ { export class $mol_card extends $mol_list {

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_card_status_type <= status
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_card_status_type" :  this.status() ,
		})
	}

	/**
	 *  ```
	 *  status \
	 *  ```
	 **/
	status() {
		return ""
	}

	/**
	 *  ```
	 *  rows /$mol_view
	 *  	<= Content
	 *  	<= Status
	 *  ```
	 **/
	rows() {
		return [ this.Content() , this.Status() ] as readonly ( $mol_view )[]
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
	 *  content /$mol_view_content
	 *  ```
	 **/
	content() {
		return [  ] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  Status $mol_view
	 *  	minimal_height 30
	 *  	sub / <= status_text
	 *  ```
	 **/
	@ $mol_mem
	Status() {
		return (( obj )=>{
			obj.minimal_height = () => 30
			obj.sub = () => [ this.status_text() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  status_text <= status
	 *  ```
	 **/
	status_text() {
		return this.status()
	}

} }

