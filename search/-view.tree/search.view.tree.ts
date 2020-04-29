namespace $ { export class $mol_search extends $mol_bar {

	/**
	 *  ```
	 *  query?val \
	 *  ```
	 **/
	@ $mol_mem
	query( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Suggest
	 *  	<= Clear
	 *  ```
	 **/
	sub() {
		return [this.Suggest() , this.Clear()] as readonly any[]
	}

	/**
	 *  ```
	 *  Suggest $mol_select
	 *  	value?val <=> suggest_selected?val
	 *  	filter_pattern?val <=> suggest_selected?val
	 *  	hint <= hint
	 *  	filter_pattern?val <=> query?val
	 *  	options_showed <= suggests_showed
	 *  	options <= suggests
	 *  	Trigger_icon null
	 *  	debounce <= debounce
	 *  ```
	 **/
	@ $mol_mem
	Suggest() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.suggest_selected( val )
			obj.filter_pattern = ( val? : any ) => this.suggest_selected( val )
			obj.hint = () => this.hint()
			obj.filter_pattern = ( val? : any ) => this.query( val )
			obj.options_showed = () => this.suggests_showed()
			obj.options = () => this.suggests()
			obj.Trigger_icon = () => null as any
			obj.debounce = () => this.debounce()
			return obj
		})( new this.$.$mol_select(  ) )
	}

	/**
	 *  ```
	 *  suggest_selected?val \
	 *  ```
	 **/
	@ $mol_mem
	suggest_selected( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  hint @ \Search...
	 *  ```
	 **/
	hint() {
		return this.$.$mol_locale.text( "$mol_search_hint" )
	}

	/**
	 *  ```
	 *  suggests_showed false
	 *  ```
	 **/
	suggests_showed() {
		return false
	}

	/**
	 *  ```
	 *  suggests /string
	 *  ```
	 **/
	suggests() {
		return [] as readonly ( string )[]
	}

	/**
	 *  ```
	 *  debounce 200
	 *  ```
	 **/
	debounce() {
		return 200
	}

	/**
	 *  ```
	 *  Clear $mol_button_minor
	 *  	sub / <= Clear_icon
	 *  	event_click?val <=> event_clear?val
	 *  ```
	 **/
	@ $mol_mem
	Clear() {
		return (( obj )=>{
			obj.sub = () => [this.Clear_icon()] as readonly any[]
			obj.event_click = ( val? : any ) => this.event_clear( val )
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  Clear_icon $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem
	Clear_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  event_clear?val null
	 *  ```
	 **/
	@ $mol_mem
	event_clear( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/search/-view.tree/search.view.tree.map