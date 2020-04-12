namespace $ { export class $mol_toolbar_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Foldable toolbar demo
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_toolbar_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Toolbar
	 *  ```
	 **/
	sub() {
		return [ this.Toolbar() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Toolbar $mol_toolbar items /
	 *  	<= Approve
	 *  	<= Decline
	 *  	<= Copy
	 *  	<= Cut
	 *  	<= Paste
	 *  	<= Delete
	 *  	<= Modify
	 *  ```
	 **/
	@ $mol_mem
	Toolbar() {
		return (( obj )=>{
			obj.items = () => [ this.Approve() , this.Decline() , this.Copy() , this.Cut() , this.Paste() , this.Delete() , this.Modify() ] as readonly any[]
			return obj
		})( new this.$.$mol_toolbar(  ) )
	}

	/**
	 *  ```
	 *  Approve $mol_button_major title <= approve_label
	 *  ```
	 **/
	@ $mol_mem
	Approve() {
		return (( obj )=>{
			obj.title = () => this.approve_label()
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  approve_label @ \Approve
	 *  ```
	 **/
	approve_label() {
		return this.$.$mol_locale.text( "$mol_toolbar_demo_approve_label" )
	}

	/**
	 *  ```
	 *  Decline $mol_button_minor title <= decline_label
	 *  ```
	 **/
	@ $mol_mem
	Decline() {
		return (( obj )=>{
			obj.title = () => this.decline_label()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  decline_label @ \Decline
	 *  ```
	 **/
	decline_label() {
		return this.$.$mol_locale.text( "$mol_toolbar_demo_decline_label" )
	}

	/**
	 *  ```
	 *  Copy $mol_button_minor sub / <= Copy_icon
	 *  ```
	 **/
	@ $mol_mem
	Copy() {
		return (( obj )=>{
			obj.sub = () => [ this.Copy_icon() ] as readonly any[]
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  Copy_icon $mol_icon_content_copy
	 *  ```
	 **/
	@ $mol_mem
	Copy_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_content_copy(  ) )
	}

	/**
	 *  ```
	 *  Cut $mol_button_minor sub / <= Cut_icon
	 *  ```
	 **/
	@ $mol_mem
	Cut() {
		return (( obj )=>{
			obj.sub = () => [ this.Cut_icon() ] as readonly any[]
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  Cut_icon $mol_icon_content_cut
	 *  ```
	 **/
	@ $mol_mem
	Cut_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_content_cut(  ) )
	}

	/**
	 *  ```
	 *  Paste $mol_button_minor sub / <= Paste_icon
	 *  ```
	 **/
	@ $mol_mem
	Paste() {
		return (( obj )=>{
			obj.sub = () => [ this.Paste_icon() ] as readonly any[]
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  Paste_icon $mol_icon_content_paste
	 *  ```
	 **/
	@ $mol_mem
	Paste_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_content_paste(  ) )
	}

	/**
	 *  ```
	 *  Delete $mol_button_minor sub / <= Delete_icon
	 *  ```
	 **/
	@ $mol_mem
	Delete() {
		return (( obj )=>{
			obj.sub = () => [ this.Delete_icon() ] as readonly any[]
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  Delete_icon $mol_icon_delete
	 *  ```
	 **/
	@ $mol_mem
	Delete_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_delete(  ) )
	}

	/**
	 *  ```
	 *  Modify $mol_bar sub /
	 *  	<= Search
	 *  	<= Replace
	 *  ```
	 **/
	@ $mol_mem
	Modify() {
		return (( obj )=>{
			obj.sub = () => [ this.Search() , this.Replace() ] as readonly any[]
			return obj
		})( new this.$.$mol_bar(  ) )
	}

	/**
	 *  ```
	 *  Search $mol_string hint <= search_hint
	 *  ```
	 **/
	@ $mol_mem
	Search() {
		return (( obj )=>{
			obj.hint = () => this.search_hint()
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  search_hint @ \Search...
	 *  ```
	 **/
	search_hint() {
		return this.$.$mol_locale.text( "$mol_toolbar_demo_search_hint" )
	}

	/**
	 *  ```
	 *  Replace $mol_string hint <= replace_hint
	 *  ```
	 **/
	@ $mol_mem
	Replace() {
		return (( obj )=>{
			obj.hint = () => this.replace_hint()
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  replace_hint @ \Replace...
	 *  ```
	 **/
	replace_hint() {
		return this.$.$mol_locale.text( "$mol_toolbar_demo_replace_hint" )
	}

} }

