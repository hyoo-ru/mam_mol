namespace $ { export class $mol_section extends $mol_list {

	/**
	 *  ```
	 *  rows /
	 *  	<= Head
	 *  	<= Content
	 *  ```
	 **/
	rows() {
		return [].concat( this.Head() , this.Content() )
	}

	/**
	 *  ```
	 *  Head $mol_view sub / <= head
	 *  ```
	 **/
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.head() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  head null
	 *  ```
	 **/
	head() {
		return null as any
	}

	/**
	 *  ```
	 *  Content null
	 *  ```
	 **/
	Content() {
		return null as any
	}

} }

