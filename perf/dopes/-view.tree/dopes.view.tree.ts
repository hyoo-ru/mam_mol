namespace $ { export class $mol_perf_dopes extends $mol_view {

	/**
	 *  ```
	 *  title \Dopes
	 *  ```
	 **/
	title() {
		return "Dopes"
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Speed
	 *  	<= Start
	 *  	<= Stop
	 *  	<= Labels
	 *  ```
	 **/
	sub() {
		return [this.Speed() , this.Start() , this.Stop() , this.Labels()] as readonly any[]
	}

	/**
	 *  ```
	 *  Speed $mol_view sub / <= speed
	 *  ```
	 **/
	@ $mol_mem
	Speed() {
		return (( obj )=>{
			obj.sub = () => [this.speed()] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  speed \{speed} Dopes/s
	 *  ```
	 **/
	speed() {
		return "{speed} Dopes/s"
	}

	/**
	 *  ```
	 *  Start $mol_button_major
	 *  	title \@ Start
	 *  	click?event <=> start?event
	 *  ```
	 **/
	@ $mol_mem
	Start() {
		return (( obj )=>{
			obj.title = () => "@ Start"
			obj.click = ( event? : any ) => this.start( event )
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  start?event null
	 *  ```
	 **/
	@ $mol_mem
	start( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  Stop $mol_button_major
	 *  	title \@ Stop
	 *  	click?event <=> stop?event
	 *  ```
	 **/
	@ $mol_mem
	Stop() {
		return (( obj )=>{
			obj.title = () => "@ Stop"
			obj.click = ( event? : any ) => this.stop( event )
			return obj
		})( new this.$.$mol_button_major(  ) )
	}

	/**
	 *  ```
	 *  stop?event null
	 *  ```
	 **/
	@ $mol_mem
	stop( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  Labels $mol_view sub <= labels
	 *  ```
	 **/
	@ $mol_mem
	Labels() {
		return (( obj )=>{
			obj.sub = () => this.labels()
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  labels /
	 *  ```
	 **/
	labels() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Label!index $mol_view
	 *  	style *
	 *  		color <= label_color!index
	 *  		transform <= label_transform!index
	 *  	sub / \Dope
	 *  ```
	 **/
	@ $mol_mem_key
	Label( index : any ) {
		return (( obj )=>{
			obj.style = () => ({
			"color" :  this.label_color(index) ,
			"transform" :  this.label_transform(index) ,
		})
			obj.sub = () => ["Dope"] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  label_color!index \
	 *  ```
	 **/
	label_color( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  label_transform!index \
	 *  ```
	 **/
	label_transform( index : any ) {
		return ""
	}

} }
