namespace $ { export class $mol_app_life extends $mol_page {

	/**
	 *  ```
	 *  title @ \Life of {population} cells
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_life_title" )
	}

	/**
	 *  ```
	 *  tools /
	 *  	<= Store_link
	 *  	<= Time
	 *  ```
	 **/
	tools() {
		return [ this.Store_link() , this.Time() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Store_link $mol_link
	 *  	uri <= store_link?val
	 *  	hint <= store_link_hint
	 *  	sub / <= Stored
	 *  ```
	 **/
	@ $mol_mem
	Store_link() {
		return (( obj )=>{
			obj.uri = () => this.store_link()
			obj.hint = () => this.store_link_hint()
			obj.sub = () => [ this.Stored() ] as readonly any[]
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  store_link?val \
	 *  ```
	 **/
	@ $mol_mem
	store_link( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  store_link_hint @ \Store snapshot
	 *  ```
	 **/
	store_link_hint() {
		return this.$.$mol_locale.text( "$mol_app_life_store_link_hint" )
	}

	/**
	 *  ```
	 *  Stored $mol_icon_stored
	 *  ```
	 **/
	@ $mol_mem
	Stored() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_stored(  ) )
	}

	/**
	 *  ```
	 *  Time $mol_switch
	 *  	value?val <=> speed?val
	 *  	options *
	 *  		1 <= time_slowest_label
	 *  		5 <= time_slow_label
	 *  		25 <= time_fast_label
	 *  		1000 <= time_fastest_label
	 *  ```
	 **/
	@ $mol_mem
	Time() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.speed( val )
			obj.options = () => ({
			"1" :  this.time_slowest_label() ,
			"5" :  this.time_slow_label() ,
			"25" :  this.time_fast_label() ,
			"1000" :  this.time_fastest_label() ,
		})
			return obj
		})( new this.$.$mol_switch(  ) )
	}

	/**
	 *  ```
	 *  speed?val 0
	 *  ```
	 **/
	@ $mol_mem
	speed( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  time_slowest_label @ \Slowest
	 *  ```
	 **/
	time_slowest_label() {
		return this.$.$mol_locale.text( "$mol_app_life_time_slowest_label" )
	}

	/**
	 *  ```
	 *  time_slow_label @ \Slow
	 *  ```
	 **/
	time_slow_label() {
		return this.$.$mol_locale.text( "$mol_app_life_time_slow_label" )
	}

	/**
	 *  ```
	 *  time_fast_label @ \Fast
	 *  ```
	 **/
	time_fast_label() {
		return this.$.$mol_locale.text( "$mol_app_life_time_fast_label" )
	}

	/**
	 *  ```
	 *  time_fastest_label @ \Fastest
	 *  ```
	 **/
	time_fastest_label() {
		return this.$.$mol_locale.text( "$mol_app_life_time_fastest_label" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Head
	 *  	<= Map
	 *  ```
	 **/
	sub() {
		return [ this.Head() , this.Map() ] as readonly any[]
	}

	snapshot_current() {
		return this.Map().snapshot_current(  )
	}

	population() {
		return this.Map().population(  )
	}

	/**
	 *  ```
	 *  Map $mol_app_life_map
	 *  	speed <= speed
	 *  	snapshot <= snapshot
	 *  	snapshot_current => snapshot_current
	 *  	population => population
	 *  ```
	 **/
	@ $mol_mem
	Map() {
		return (( obj )=>{
			obj.speed = () => this.speed()
			obj.snapshot = () => this.snapshot()
			return obj
		})( new this.$.$mol_app_life_map(  ) )
	}

	/**
	 *  ```
	 *  snapshot \0~-2ffff~10002~-20000~-1fffe~3~10003~20003
	 *  ```
	 **/
	snapshot() {
		return "0~-2ffff~10002~-20000~-1fffe~3~10003~20003"
	}

} }

