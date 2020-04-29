namespace $ { export class $mol_textarea extends $mol_view {

	/**
	 *  ```
	 *  event * keydown?event <=> press?event
	 *  ```
	 **/
	event() {
		return ({
			"keydown" :  ( event? : any )=>  this.press( event ) ,
		})
	}

	/**
	 *  ```
	 *  press?event null
	 *  ```
	 **/
	@ $mol_mem
	press( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Edit
	 *  	<= View
	 *  ```
	 **/
	sub() {
		return [this.Edit() , this.View()] as readonly any[]
	}

	/**
	 *  ```
	 *  Edit $mol_string
	 *  	dom_name \textarea
	 *  	value?val <=> value?val
	 *  	hint <= hint
	 *  	debounce 0
	 *  	enabled <= enabled
	 *  ```
	 **/
	@ $mol_mem
	Edit() {
		return (( obj )=>{
			obj.dom_name = () => "textarea"
			obj.value = ( val? : any ) => this.value( val )
			obj.hint = () => this.hint()
			obj.debounce = () => 0
			obj.enabled = () => this.enabled()
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  value?val \
	 *  ```
	 **/
	@ $mol_mem
	value( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  hint \
	 *  ```
	 **/
	hint() {
		return ""
	}

	/**
	 *  ```
	 *  enabled true
	 *  ```
	 **/
	enabled() {
		return true
	}

	/**
	 *  ```
	 *  View $mol_text text <= text
	 *  ```
	 **/
	@ $mol_mem
	View() {
		return (( obj )=>{
			obj.text = () => this.text()
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  text \
	 *  ```
	 **/
	text() {
		return ""
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/textarea/-view.tree/textarea.view.tree.map