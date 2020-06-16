namespace $ { export class $mol_link_source extends $mol_link {

	/**
	 *  ```
	 *  hint @ \Source code
	 *  ```
	 **/
	hint() {
		return this.$.$mol_locale.text( "$mol_link_source_hint" )
	}

	/**
	 *  ```
	 *  sub / <= Icon
	 *  ```
	 **/
	sub() {
		return [this.Icon()] as readonly any[]
	}

	/**
	 *  ```
	 *  Icon $mol_icon_github_circle
	 *  ```
	 **/
	@ $mol_mem
	Icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_github_circle(  ) )
	}

} }
