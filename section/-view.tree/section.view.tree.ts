namespace $ { export class $mol_section extends $mol_list {

	/**
	 *  ```
	 *  rows /
	 *  	<= Head
	 *  	<= Content
	 *  ```
	 **/
	rows() {
		return [this.Head() , this.Content()] as readonly any[]
	}

	/**
	 *  ```
	 *  Head $mol_view sub <= head
	 *  ```
	 **/
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.sub = () => this.head()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  head /
	 *  ```
	 **/
	head() {
		return [] as readonly any[]
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
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/section/-view.tree/section.view.tree.map