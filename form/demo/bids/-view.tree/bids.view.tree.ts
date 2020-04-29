namespace $ { export class $mol_form_demo_bids extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Sign Up form demo
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_title" )
	}

	/**
	 *  ```
	 *  message_required @ \Required
	 *  ```
	 **/
	message_required() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_message_required" )
	}

	/**
	 *  ```
	 *  message_no_spaces @ \No spaces!
	 *  ```
	 **/
	message_no_spaces() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_message_no_spaces" )
	}

	/**
	 *  ```
	 *  message_need_more_letters @ \{count} or more letters
	 *  ```
	 **/
	message_need_more_letters() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_message_need_more_letters" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Form
	 *  	<= Message
	 *  ```
	 **/
	sub() {
		return [this.Form() , this.Message()] as readonly any[]
	}

	/**
	 *  ```
	 *  Form $mol_form
	 *  	submit?val <=> submit?val
	 *  	form_fields /
	 *  		<= Name_first_field
	 *  		<= Name_nick_field
	 *  		<= Name_second_field
	 *  		<= Sex_field
	 *  	buttons / <= Submit
	 *  ```
	 **/
	@ $mol_mem
	Form() {
		return (( obj )=>{
			obj.submit = ( val? : any ) => this.submit( val )
			obj.form_fields = () => [this.Name_first_field() , this.Name_nick_field() , this.Name_second_field() , this.Sex_field()] as readonly any[]
			obj.buttons = () => [this.Submit()] as readonly any[]
			return obj
		})( new this.$.$mol_form(  ) )
	}

	/**
	 *  ```
	 *  submit?val null
	 *  ```
	 **/
	@ $mol_mem
	submit( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Name_first_field $mol_form_field
	 *  	name <= name_first_label
	 *  	bid <= name_first_bid
	 *  	control <= Name_first_control
	 *  ```
	 **/
	@ $mol_mem
	Name_first_field() {
		return (( obj )=>{
			obj.name = () => this.name_first_label()
			obj.bid = () => this.name_first_bid()
			obj.control = () => this.Name_first_control()
			return obj
		})( new this.$.$mol_form_field(  ) )
	}

	/**
	 *  ```
	 *  name_first_label @ \First Name
	 *  ```
	 **/
	name_first_label() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_name_first_label" )
	}

	/**
	 *  ```
	 *  name_first_bid \
	 *  ```
	 **/
	name_first_bid() {
		return ""
	}

	/**
	 *  ```
	 *  Name_first_control $mol_string
	 *  	hint <= name_first_hint
	 *  	value?val <=> name_first?val
	 *  ```
	 **/
	@ $mol_mem
	Name_first_control() {
		return (( obj )=>{
			obj.hint = () => this.name_first_hint()
			obj.value = ( val? : any ) => this.name_first( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  name_first_hint @ \Jack
	 *  ```
	 **/
	name_first_hint() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_name_first_hint" )
	}

	/**
	 *  ```
	 *  name_first?val \
	 *  ```
	 **/
	@ $mol_mem
	name_first( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Name_nick_field $mol_form_field
	 *  	name <= name_nick_label
	 *  	bid <= name_nick_bid
	 *  	control <= Name_nick_control
	 *  ```
	 **/
	@ $mol_mem
	Name_nick_field() {
		return (( obj )=>{
			obj.name = () => this.name_nick_label()
			obj.bid = () => this.name_nick_bid()
			obj.control = () => this.Name_nick_control()
			return obj
		})( new this.$.$mol_form_field(  ) )
	}

	/**
	 *  ```
	 *  name_nick_label @ \Nick Name
	 *  ```
	 **/
	name_nick_label() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_name_nick_label" )
	}

	/**
	 *  ```
	 *  name_nick_bid \
	 *  ```
	 **/
	name_nick_bid() {
		return ""
	}

	/**
	 *  ```
	 *  Name_nick_control $mol_string
	 *  	hint <= name_nick_hint
	 *  	value?val <=> name_nick?val
	 *  ```
	 **/
	@ $mol_mem
	Name_nick_control() {
		return (( obj )=>{
			obj.hint = () => this.name_nick_hint()
			obj.value = ( val? : any ) => this.name_nick( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  name_nick_hint @ \Capitan
	 *  ```
	 **/
	name_nick_hint() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_name_nick_hint" )
	}

	/**
	 *  ```
	 *  name_nick?val \
	 *  ```
	 **/
	@ $mol_mem
	name_nick( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Name_second_field $mol_form_field
	 *  	name <= name_second_label
	 *  	bid <= name_second_bid
	 *  	control <= Name_second_control
	 *  ```
	 **/
	@ $mol_mem
	Name_second_field() {
		return (( obj )=>{
			obj.name = () => this.name_second_label()
			obj.bid = () => this.name_second_bid()
			obj.control = () => this.Name_second_control()
			return obj
		})( new this.$.$mol_form_field(  ) )
	}

	/**
	 *  ```
	 *  name_second_label @ \Second Name
	 *  ```
	 **/
	name_second_label() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_name_second_label" )
	}

	/**
	 *  ```
	 *  name_second_bid \
	 *  ```
	 **/
	name_second_bid() {
		return ""
	}

	/**
	 *  ```
	 *  Name_second_control $mol_string
	 *  	hint <= name_second_hint
	 *  	value?val <=> name_second?val
	 *  ```
	 **/
	@ $mol_mem
	Name_second_control() {
		return (( obj )=>{
			obj.hint = () => this.name_second_hint()
			obj.value = ( val? : any ) => this.name_second( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  name_second_hint @ \Sparrow
	 *  ```
	 **/
	name_second_hint() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_name_second_hint" )
	}

	/**
	 *  ```
	 *  name_second?val \
	 *  ```
	 **/
	@ $mol_mem
	name_second( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Sex_field $mol_form_field
	 *  	name <= sex_label
	 *  	bid <= sex_bid
	 *  	control <= Sex_control
	 *  ```
	 **/
	@ $mol_mem
	Sex_field() {
		return (( obj )=>{
			obj.name = () => this.sex_label()
			obj.bid = () => this.sex_bid()
			obj.control = () => this.Sex_control()
			return obj
		})( new this.$.$mol_form_field(  ) )
	}

	/**
	 *  ```
	 *  sex_label @ \Sex
	 *  ```
	 **/
	sex_label() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_sex_label" )
	}

	/**
	 *  ```
	 *  sex_bid \
	 *  ```
	 **/
	sex_bid() {
		return ""
	}

	/**
	 *  ```
	 *  Sex_control $mol_switch
	 *  	value?val <=> sex?val
	 *  	options <= sex_options
	 *  ```
	 **/
	@ $mol_mem
	Sex_control() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.sex( val )
			obj.options = () => this.sex_options()
			return obj
		})( new this.$.$mol_switch(  ) )
	}

	/**
	 *  ```
	 *  sex?val \
	 *  ```
	 **/
	@ $mol_mem
	sex( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  sex_options *
	 *  	male <= sex_option_male
	 *  	intersex <= sex_option_intersex
	 *  	female <= sex_option_female
	 *  ```
	 **/
	sex_options() {
		return ({
			"male" :  this.sex_option_male() ,
			"intersex" :  this.sex_option_intersex() ,
			"female" :  this.sex_option_female() ,
		})
	}

	/**
	 *  ```
	 *  sex_option_male @ \Male
	 *  ```
	 **/
	sex_option_male() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_sex_option_male" )
	}

	/**
	 *  ```
	 *  sex_option_intersex @ \Intersex
	 *  ```
	 **/
	sex_option_intersex() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_sex_option_intersex" )
	}

	/**
	 *  ```
	 *  sex_option_female @ \Female
	 *  ```
	 **/
	sex_option_female() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_sex_option_female" )
	}

	/**
	 *  ```
	 *  Submit $mol_button_major
	 *  	sub / <= submit_text
	 *  	click?val <=> submit?val
	 *  	disabled <= submit_blocked
	 *  ```
	 **/
	@ $mol_mem
	Submit() {
		return (( obj )=>{
			obj.sub = () => [this.submit_text()] as readonly any[]
			obj.click = ( val? : any ) => this.submit( val )
			obj.disabled = () => this.submit_blocked()
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  submit_text @ \Sign Up
	 *  ```
	 **/
	submit_text() {
		return this.$.$mol_locale.text( "$mol_form_demo_bids_submit_text" )
	}

	/**
	 *  ```
	 *  submit_blocked true
	 *  ```
	 **/
	submit_blocked() {
		return true
	}

	/**
	 *  ```
	 *  Message $mol_view sub / <= message?val
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
	 *  message?val \
	 *  ```
	 **/
	@ $mol_mem
	message( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/form/demo/bids/-view.tree/bids.view.tree.map