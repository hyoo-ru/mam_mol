namespace $ { export class $mol_form_field extends $mol_labeler {

	/**
	 *  ```
	 *  label /
	 *  	<= name
	 *  	<= Bid
	 *  ```
	 **/
	label() {
		return [].concat( this.name() , this.Bid() )
	}

	/**
	 *  ```
	 *  name \
	 *  ```
	 **/
	name() {
		return ""
	}

	/**
	 *  ```
	 *  Bid $mol_view sub / <= bid
	 *  ```
	 **/
	@ $mol_mem
	Bid() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.bid() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  bid \
	 *  ```
	 **/
	bid() {
		return ""
	}

	/**
	 *  ```
	 *  Content <= control
	 *  ```
	 **/
	Content() {
		return this.control()
	}

	/**
	 *  ```
	 *  control null
	 *  ```
	 **/
	control() {
		return null as any
	}

} }

