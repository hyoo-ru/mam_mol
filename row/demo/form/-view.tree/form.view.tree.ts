namespace $ { export class $mol_row_demo_form extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Some controls in one row with equal paddings and wrapping support
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_row_demo_form_title" )
	}

	/**
	 *  ```
	 *  sub / <= Row
	 *  ```
	 **/
	sub() {
		return [ this.Row() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Row $mol_row sub /
	 *  	<= Name
	 *  	<= Count
	 *  	<= Progress
	 *  	<= Publish
	 *  	<= Drop
	 *  ```
	 **/
	@ $mol_mem
	Row() {
		return (( obj )=>{
			obj.sub = () => [ this.Name() , this.Count() , this.Progress() , this.Publish() , this.Drop() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Name $mol_search
	 *  	hint <= name_hint
	 *  	query?val <=> name?val
	 *  	suggests /
	 *  		<= suggest1
	 *  		<= suggest2
	 *  ```
	 **/
	@ $mol_mem
	Name() {
		return (( obj )=>{
			obj.hint = () => this.name_hint()
			obj.query = ( val? : any ) => this.name( val )
			obj.suggests = () => [ this.suggest1() , this.suggest2() ] as readonly any[]
			return obj
		})( new this.$.$mol_search(  ) )
	}

	/**
	 *  ```
	 *  name_hint @ \Jack Sparrow
	 *  ```
	 **/
	name_hint() {
		return this.$.$mol_locale.text( "$mol_row_demo_form_name_hint" )
	}

	/**
	 *  ```
	 *  name?val \
	 *  ```
	 **/
	@ $mol_mem
	name( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  suggest1 @ \Jack Sparrow
	 *  ```
	 **/
	suggest1() {
		return this.$.$mol_locale.text( "$mol_row_demo_form_suggest1" )
	}

	/**
	 *  ```
	 *  suggest2 @ \Bruce Wayne
	 *  ```
	 **/
	suggest2() {
		return this.$.$mol_locale.text( "$mol_row_demo_form_suggest2" )
	}

	/**
	 *  ```
	 *  Count $mol_number
	 *  	hint <= count_hint
	 *  	value?val <=> count?val
	 *  ```
	 **/
	@ $mol_mem
	Count() {
		return (( obj )=>{
			obj.hint = () => this.count_hint()
			obj.value = ( val? : any ) => this.count( val )
			return obj
		})( new this.$.$mol_number(  ) )
	}

	/**
	 *  ```
	 *  count_hint @ \Count
	 *  ```
	 **/
	count_hint() {
		return this.$.$mol_locale.text( "$mol_row_demo_form_count_hint" )
	}

	/**
	 *  ```
	 *  count?val null
	 *  ```
	 **/
	@ $mol_mem
	count( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Progress $mol_portion portion <= progress
	 *  ```
	 **/
	@ $mol_mem
	Progress() {
		return (( obj )=>{
			obj.portion = () => this.progress()
			return obj
		})( new this.$.$mol_portion(  ) )
	}

	/**
	 *  ```
	 *  progress 0.33
	 *  ```
	 **/
	progress() {
		return 0.33
	}

	/**
	 *  ```
	 *  Publish $mol_check_box
	 *  	title <= publish_label
	 *  	checked?val <=> publish?val
	 *  ```
	 **/
	@ $mol_mem
	Publish() {
		return (( obj )=>{
			obj.title = () => this.publish_label()
			obj.checked = ( val? : any ) => this.publish( val )
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  publish_label @ \Shared
	 *  ```
	 **/
	publish_label() {
		return this.$.$mol_locale.text( "$mol_row_demo_form_publish_label" )
	}

	/**
	 *  ```
	 *  publish?val false
	 *  ```
	 **/
	@ $mol_mem
	publish( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  Drop $mol_button_minor title <= drop_title
	 *  ```
	 **/
	@ $mol_mem
	Drop() {
		return (( obj )=>{
			obj.title = () => this.drop_title()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  drop_title @ \Drop
	 *  ```
	 **/
	drop_title() {
		return this.$.$mol_locale.text( "$mol_row_demo_form_drop_title" )
	}

} }

