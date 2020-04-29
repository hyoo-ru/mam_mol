namespace $ { export class $mol_svg extends $mol_view {

	/**
	 *  ```
	 *  dom_name \svg
	 *  ```
	 **/
	dom_name() {
		return "svg"
	}

	/**
	 *  ```
	 *  dom_name_space \http://www.w3.org/2000/svg
	 *  ```
	 **/
	dom_name_space() {
		return "http://www.w3.org/2000/svg"
	}

	/**
	 *  ```
	 *  text_width?text 0
	 *  ```
	 **/
	@ $mol_mem
	text_width( text? : any , force? : $mol_mem_force ) {
		return ( text !== void 0 ) ? text : 0
	}

	/**
	 *  ```
	 *  font_size 16
	 *  ```
	 **/
	font_size() {
		return 16
	}

	/**
	 *  ```
	 *  font_family \
	 *  ```
	 **/
	font_family() {
		return ""
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/svg/-view.tree/svg.view.tree.map