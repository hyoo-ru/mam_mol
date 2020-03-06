namespace $ { export class $mol_form_field extends $mol_labeler {

	/**
	 *  ```
	 *  label /
	 *  	<= name
	 *  	<= Bid
	 *  ```
	 **/
	label() {
		return [ this.name() , this.Bid() ] as readonly any[]
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
			obj.sub = () => [ this.bid() ] as readonly any[]
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

