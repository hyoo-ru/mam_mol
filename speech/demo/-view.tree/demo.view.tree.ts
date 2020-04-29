namespace $ { export class $mol_speech_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  sub /
	 *  	<= Toggle
	 *  	<= Message
	 *  	<= Speak
	 *  ```
	 **/
	sub() {
		return [this.Toggle() , this.Message() , this.Speak()] as readonly any[]
	}

	/**
	 *  ```
	 *  Toggle $mol_check_icon
	 *  	Icon <= Toggle_icon
	 *  	checked?val <=> hearing?val
	 *  ```
	 **/
	@ $mol_mem
	Toggle() {
		return (( obj )=>{
			obj.Icon = () => this.Toggle_icon()
			obj.checked = ( val? : any ) => this.hearing( val )
			return obj
		})( new this.$.$mol_check_icon(  ) )
	}

	/**
	 *  ```
	 *  Toggle_icon $mol_icon_microphone
	 *  ```
	 **/
	@ $mol_mem
	Toggle_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_microphone(  ) )
	}

	/**
	 *  ```
	 *  hearing?val false
	 *  ```
	 **/
	@ $mol_mem
	hearing( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Message $mol_view sub / <= message
	 *  ```
	 **/
	@ $mol_mem
	Message() {
		return (( obj )=>{
			obj.sub = () => [this.message()] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  message \
	 *  ```
	 **/
	message() {
		return ""
	}

	/**
	 *  ```
	 *  Speak $mol_button_major
	 *  	click?val <=> speak?val
	 *  	sub / \Speak
	 *  ```
	 **/
	@ $mol_mem
	Speak() {
		return (( obj )=>{
			obj.click = ( val? : any ) => this.speak( val )
			obj.sub = () => ["Speak"] as readonly any[]
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  speak?val false
	 *  ```
	 **/
	@ $mol_mem
	speak( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/speech/demo/-view.tree/demo.view.tree.map