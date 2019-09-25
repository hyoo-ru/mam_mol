namespace $ { export class $mol_chat extends $mol_list {

	/**
	 *  ```
	 *  rows /
	 *  	<= posts
	 *  	<= Add_status
	 *  	<= Add
	 *  ```
	 **/
	rows() {
		return [].concat( this.posts() , this.Add_status() , this.Add() )
	}

	/**
	 *  ```
	 *  posts /
	 *  ```
	 **/
	posts() {
		return [].concat(  )
	}

	/**
	 *  ```
	 *  Add_status $mol_status status <= adding?next
	 *  ```
	 **/
	@ $mol_mem
	Add_status() {
		return (( obj )=>{
			obj.status = () => this.adding()
			return obj
		})( new this.$.$mol_status(  ) )
	}

	/**
	 *  ```
	 *  adding?next null
	 *  ```
	 **/
	@ $mol_mem
	adding( next? : any , force? : $mol_atom_force ) {
		return ( next !== void 0 ) ? next : null as any
	}

	/**
	 *  ```
	 *  Add $mol_bar sub /
	 *  	<= Add_body
	 *  	<= Add_submit
	 *  ```
	 **/
	@ $mol_mem
	Add() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Add_body() , this.Add_submit() )
			return obj
		})( new this.$.$mol_bar(  ) )
	}

	/**
	 *  ```
	 *  Add_body $mol_string
	 *  	hint <= add_hint
	 *  	value?val <=> add_body?val
	 *  ```
	 **/
	@ $mol_mem
	Add_body() {
		return (( obj )=>{
			obj.hint = () => this.add_hint()
			obj.value = ( val? : any ) => this.add_body( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  add_hint @ \New message...
	 *  ```
	 **/
	add_hint() {
		return this.$.$mol_locale.text( "$mol_chat_add_hint" )
	}

	/**
	 *  ```
	 *  add_body?val \
	 *  ```
	 **/
	@ $mol_mem
	add_body( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Add_submit $mol_button_major
	 *  	enabled <= add_submit_enabled
	 *  	title <= add_submit_label
	 *  	event_click?event <=> add?event
	 *  ```
	 **/
	@ $mol_mem
	Add_submit() {
		return (( obj )=>{
			obj.enabled = () => this.add_submit_enabled()
			obj.title = () => this.add_submit_label()
			obj.event_click = ( event? : any ) => this.add( event )
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  add_submit_enabled false
	 *  ```
	 **/
	add_submit_enabled() {
		return false
	}

	/**
	 *  ```
	 *  add_submit_label @ \Post
	 *  ```
	 **/
	add_submit_label() {
		return this.$.$mol_locale.text( "$mol_chat_add_submit_label" )
	}

	/**
	 *  ```
	 *  add?event null
	 *  ```
	 **/
	@ $mol_mem
	add( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  Post!index $mol_message
	 *  	name <= post_user_name!index
	 *  	moment <= post_updated!index
	 *  	avatar_link <= post_user_link!index
	 *  	avatar <= post_user_ava!index
	 *  	text <= post_body!index
	 *  ```
	 **/
	@ $mol_mem_key
	Post( index : any ) {
		return (( obj )=>{
			obj.name = () => this.post_user_name(index)
			obj.moment = () => this.post_updated(index)
			obj.avatar_link = () => this.post_user_link(index)
			obj.avatar = () => this.post_user_ava(index)
			obj.text = () => this.post_body(index)
			return obj
		})( new this.$.$mol_message(  ) )
	}

	/**
	 *  ```
	 *  post_user_name!index \
	 *  ```
	 **/
	post_user_name( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  post_updated!index $mol_time_moment
	 *  ```
	 **/
	@ $mol_mem_key
	post_updated( index : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_time_moment(  ) )
	}

	/**
	 *  ```
	 *  post_user_link!index \
	 *  ```
	 **/
	post_user_link( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  post_user_ava!index \
	 *  ```
	 **/
	post_user_ava( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  post_body!index \
	 *  ```
	 **/
	post_body( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  repository $mol_github_repository
	 *  ```
	 **/
	@ $mol_mem
	repository() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_github_repository(  ) )
	}

	/**
	 *  ```
	 *  repository_name \
	 *  ```
	 **/
	repository_name() {
		return ""
	}

	/**
	 *  ```
	 *  link \
	 *  ```
	 **/
	link() {
		return ""
	}

	/**
	 *  ```
	 *  seed \
	 *  ```
	 **/
	seed() {
		return ""
	}

	/**
	 *  ```
	 *  teaser \
	 *  ```
	 **/
	teaser() {
		return ""
	}

	/**
	 *  ```
	 *  issue $mol_github_issue
	 *  ```
	 **/
	@ $mol_mem
	issue() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_github_issue(  ) )
	}

} }

