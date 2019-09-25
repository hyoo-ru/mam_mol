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
	 *  rows /
	 *  	<= Content
	 *  	<= Status
	 *  ```
	 **/
	rows() {
		return [].concat( this.Content() , this.Status() )
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
		return [].concat(  )
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
			obj.sub = () => [].concat( this.status_text() )
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

